require("dotenv").config();
const express = require("express");
const multer = require("multer");
const app = express();
const {v2: cloudinary} = require("cloudinary");
const path = require("path");
const fs = require("fs");

// I use this file for testing cloudinary upload 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, "public", "upload"));
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    },
})

const upload = multer({storage: storage});
app.post("/upload", upload.single("article_image"), async(request, response)=>{
    try {
        const result = await cloudinary.uploader.upload(request.file.path, {
            folder: "uploads"
        });
        fs.unlinkSync(request.file.path);
        
        response.json({
            status: "success",
            message: "File uploaded successfully",
            url: result.secure_url,
        });

    } catch (error) {
        response.status(500).json({status: "error", message: "Internal Server Error"});
    }
})
app.get("/", (request, response)=>{
    response.send("hello i just want to upload my file on cloudinary");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
