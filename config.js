const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

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
}

module.exports = {
    configApp,
    configAppMiddleware,
    connectDB,
}