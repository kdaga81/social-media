const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const expressJwt = require("express-jwt");

exports.signup = async(req, res) =>{
    const userExists = await User.findOne({email : req.body.email});
    if(userExists)
    return res.status(403).json({
        error : "Email is taken!"
    });

    const user =await new User(req.body)
    await user.save();
    res.status(200).json("Signup Success! Please Login!");
};

exports.signin = (req,res)=>{
    const {email, password} = req.body;
    User.findOne({email},(err,user)=>{
        
        //if error of no user
        if(err || !user){
            return res.status(401).json({
                error : "User doesn't exists. Please SignUp!"
            });
        }

        // username and password match
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Username or Password doesn't match!"
            });
        }

        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

        res.cookie("t",token,{expire : new Date() + 9999});
        const {_id, name, email} = user;
        return res.json({token, user: {_id, name, email}});
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("t");
    return res.json({message : "Signout Successful!"});
}

exports.requireSignin= expressJwt({
    secret : process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
});