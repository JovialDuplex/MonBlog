const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");

// database connection 
const connectDB = function() {
    const url = process.env.NODE_ENV === "production" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;
    mongoose.connect(url).then(_=> {
        console.log("Databse connected successfully");
    }).catch(error=>{
        console.log("Error occured while connecting to database : ", error);
    });
}
    

// configuration of application 
const configApp = function(app) {
    app.set("appName", "Blog Application");
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
}

const configAppMiddleware = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(async (request, response, next)=>{
        const token = request.cookies.token;
        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.TOKEN_KEY);
                const user = await userModel.findById(decoded.id);
                request.user = user;
            } catch(error) {
                console.log("An Error has occurred while verifying token: ", error);
                delete request.user;
            }

        } else {
            console.log("the token has not been loaded");
            delete request.user;

        }
        console.log(request.method, request.url);
        next();
    })
}

module.exports = {
    configApp,
    configAppMiddleware,
    connectDB,
}