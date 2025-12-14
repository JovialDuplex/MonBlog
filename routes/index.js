const router = require("express").Router();
const userRouter = require("./userRoutes");
const protectRoute = require("../validationMiddlewares/authMiddleware");
const dashboardRouter = require("./dashboardRoutes");

router.use("/users", userRouter);
router.use("/dashboard", dashboardRouter);

router.get("/getuser", protectRoute, (request, response)=>{
    response.send("user is authenticated : " + JSON.stringify(request.user));
})
module.exports = router;

