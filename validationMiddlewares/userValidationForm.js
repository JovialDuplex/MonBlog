const joi = require("joi");

const userRegisterValidationSchema = joi.object({
    user_name: joi.string().required().messages({
        "string.empty" : "fill the user name field",
    }),
    user_email: joi.string().email().required().messages({
        "string.empty" : "fill the user email field",
        "string.email" : "please enter a valid email address",
    }),
    user_password: joi.string().min(6).required().messages({
        "string.empty" : "fill the user password field",
        "string.min" : "the password must be at least 6 characters long",
    }),
});

const userLoginValidationSchema = joi.object({
    user_email: joi.string().email().required().messages({
        "string.empty" : "fill the user email field",
        "string.email" : "please enter a valid email address",
    }),
    user_password: joi.string().required().messages({
        "string.empty" : "fill the user password field",
    }),
});

const validateUserRegistration = (request, response, next)=>{
    const { error } = userRegisterValidationSchema.validate(request.body, { abortEarly: false });
    if (error) {
        const details = error.details.map(detail => ({
            msg: detail.message,
            path: detail.path.join('.'),
        }));

        return response.status(400).render("users/register", { errors: details });
    } else {
        next();
    }
};

const validateUserLogin = (request, response, next)=>{
    const { error } = userLoginValidationSchema.validate(request.body, { abortEarly: false });
    if (error) {
        const details = error.details.map(detail => ({
            msg: detail.message,
            path: detail.path.join('.'),
        }));

        return response.status(400).render("users/login", { errors: details });
    }
    else {
        next();
    }
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
};