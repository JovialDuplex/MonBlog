require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const myRoutes = require("./routes/index");

const port = process.env.PORT || 3000;

config.configApp(app);
config.configAppMiddleware(app);
config.connectDB();

app.use("/", myRoutes);
app.get("/", (request, response)=>{
    response.render("index", {user: request.user});
});

app.listen(port, ()=>{
    console.log("server is running on port ", port);
});

