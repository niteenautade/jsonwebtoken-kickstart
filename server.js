// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4200;
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var configDB = require('./config/database.js');
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'nitnitnit';
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser());

// required for passport
app.use(passport.initialize());

app.use('/', express.static(path.join(__dirname, '/src/dist')));
// routes ======================================================================
require('./routes/routes.js')(app, passport,express,path,jwt); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);