/****************************************************************************************
 * @Purpose     : Here i generating Tokens
 * @file        : token.js
 * @author      : Anuj
 * @since       : 23-05-2019
 ****************************************************************************************/

 var jwt = require('jsonwebtoken');
 //var model = require('../app/model/userModel');
 process.env.SECRET_KEY = 'secret';
 function genver() { }
/**
 * Here Generating Token..
 */
 genver.prototype.generateToken=(payload) => {
    //payload.preventDefault();
     console.log("payload",payload)
    var token = jwt.sign({payload},process.env.SECRET_KEY,{ expiresIn : '1d'})
    const obj = {
        success : true,
        message : 'Token Generated',
        token   : token
    }
    return token;
 }
/**
 * Here verify Token
 */
//  genver.prototype.verifyToken = (req,res) => {
//      model.model.findOne({temporaryToken : req.params.token},(err, result) => {
//         if(err){
//             console.log("Link Expire")
//             res(err)
//         }
//         else{
//             var token = req.params.token;
//             jwt.verify(token,process.env.SECRET_KEY,(err,decode) => {
//                 if(err){
//                     console.log("Error in token Verification" ,err)
//                     res(err)
//                 }
//                 else{
//                     model.model.temporaryToken = false;
//                     model.model.isVerified = true;
//                     console.log("Email is Activated ");
//                     res.json({success : true ,message : "Email Successfully Activated"})
//                 }
//             })
//         }       
//      })
//  }

genver.prototype.verification = (req,res,next) => {
    var token1 = req.headers['token'];
    console.log("token",token1)
    if(token1){
        jwt.verify(token1,process.env.SECRET_KEY,(err,decoded) => {
            if(err){
                console.log("Error in Verified Token");
                
                return res.send({
                    success : false,
                    message : "Token is not valid"
                })
            }
            else{
                req.decoded = decoded;
                console.log("All ABout Token",req.decoded)
                console.log("Token Verified successfully");               
                next();
            }
        })
    }
    else{
        return res.send({
            success : false,
            message : "no Token Provided"
        })
    }
}

 module.exports = new genver();