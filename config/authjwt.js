var jwt = require('jsonwebtoken')    ;
var Task = require('./../models/user');
module.exports.generateToken = function(req,res,next){
    console.log('In Authenticate')
    var user = {};
    email = req.body.email;
    password = req.body.password;
    Task.findOne({'local.email' : email },function(err,user){
        if(err){
            console.log("Unable To Login");
            res.send(err);
        }
        else if(!user){
            console.log("No user found")
            res.send('No user found');
        }
        else if(user.validPassword(password) ){
            var token = jwt.sign(user,process.env.SECRET_KEY,{
                expiresIn : 120
            });
            res.json({
                success : true,
                token : token
            });
        }
        else res.send("Wrong Password");
        
    });
    
}

    // route middleware to make sure a user is logged in
module.exports.isLoggedIn =function(req, res, next) {

    var token = req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,decode){
            if(err){
                res.status(401).send("Invalid Token");
            }
            else next();
        })
    }
    else res.send("Please Send Token");
}
