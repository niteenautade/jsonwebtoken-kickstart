var jwt = require('jsonwebtoken')    ;
module.exports.authenticate = function(req,res,next){
    console.log('In Authenticate')
    var user = {};
    user['email'] = req.body.email;
    user['password'] = req.body.password;
    var token = jwt.sign(user,process.env.SECRET_KEY,{
        expiresIn : 20
    });
    res.json({
        success : true,
        token : token
    })
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
