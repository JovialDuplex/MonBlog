const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (request, response)=> {
    response.send("Welcome to My Application, the server is running on port : " + port);
});

app.listen(port, ()=>{
    console.log("server is running on port ", port);
});

