// app/routes.js
var authjwt = require('./../config/authjwt');
module.exports = function(app, passport,express,path,jwt) {
    // process the login form
    /* app.post('/login', passport.authenticate('jwt', {
        session : false,
        successRedirect : '/authenticated', // redirect to the secure profile section
        failureRedirect : '/login' // redirect back to the signup page if there is an error
    })); */
   
    
    app.post('/login',authjwt.authenticate)

    app.get('/authenticated',authjwt.isLoggedIn,function(req,res){
        console.log('We have a token . Authenticated ');
        res.send('Done');
    });

    app.get('/login',function(req,res){
        res.send('Login Page');
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    
    app.get('/signup-success', function(req, res) {
        console.log('Sign up Successful');
        // render the page and pass in any flash data if it exists
        res.json(req.user);
        
    });
    app.get('/signup-failed', function(req, res) {
        //console.log('reqss:',req);
        // render the page and pass in any flash data if it exists
        console.log('Console : Sign up Failed');
        res.send('Sign up Failed');
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
     // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup' // redirect back to the signup page if there is an error
    }));
    app.get('/profile',function(req,res){
        res.send("Profile Page")
    });
    app.get('/signup',function(req,res){
        res.send("Signup Page")
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
    /* app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../src/dist/index.html'));
    }); */

    
};


