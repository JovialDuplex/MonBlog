const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const userValidation = require("../validationMiddlewares/userValidationForm");

router.get("/register", (request, response)=> {response.render("users/register");});
router.get("/login", (request, response)=>{response.render("users/login");});

router.post("/register", userValidation.validateUserRegistration, userControllers.register);
router.post("/login", userValidation.validateUserLogin, userControllers.login);
router.get("/logout", userControllers.logout);
module.exports = router;