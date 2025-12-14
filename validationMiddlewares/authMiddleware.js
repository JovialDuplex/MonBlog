const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = async (request, response, next)=>{
    const {token} = request.cookies;
    console.log(request.cookies);
    
    if(token) {
        console.log("Token found in cookies : ", token);
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const user = await userModel.findById(decoded.id);
            console.log("User is allowed to access this route");
            next();
            
        } catch (error) {
            console.log("An error occurred while verifying token: ", error);
            response.status(401).redirect("users/login");
        }

    } else {
        console.log("Token not found, so you no have access to this route");
        return response.status(401).redirect("/users/login");
    }
};

module.exports = protectRoute;