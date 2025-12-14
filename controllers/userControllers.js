const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (request, response)=>{    
    const {user_email, user_password} = request.body;
    const user = await userModel.findOne({user_email: user_email});
    if (user) {
        if (user.user_password === user_password){
            const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY, {expiresIn: "7d"});
            
            request.user = user;

            response.cookie("token", token, {
                // httpOnly: true, 
                secure: false, 
                maxAge: 7*24*60*60*1000
            });
            return response.redirect("/");
        }
        else {
            response.render("users/login", {msg: "Invalid credentials"});
        }
    } else {
        response.render("users/login", {msg: "Invalid credentials"})
    }
};

const register = async (request, response)=>{
    const {user_name, user_email, user_password} = request.body;
    const user = await userModel.findOne({user_email: user_email});
    if(user) {
        response.render("users/register", {msg: "User already exists"});
    } else {
        const myUser = await userModel.create({
            user_name, 
            user_email,
            user_password,
        });

        const token = jwt.sign({id: myUser._id}, process.env.TOKEN_KEY, {expiresIn: "7d"});
        request.user = myUser;
        response.cookie("token", token, {
            httpOnly: true, 
            secure: false, 
            maxAge: 7*24*60*60*1000
        });
        response.redirect("/");
    }
};
const logout = (request, response)=>{
    response.clearCookie("token");
    return response.redirect("/");
};

module.exports = {
    login, 
    register,
    logout,
};