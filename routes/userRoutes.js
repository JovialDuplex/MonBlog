const router = require("express").Router();

router.get("/", (request, response)=>{
    response.send("Welcome to the user routes !");
})
module.exports = router;
