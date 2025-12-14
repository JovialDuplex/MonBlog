const router = require('express').Router();
const router2 = require("express").Router();

const dashboardController = require("../controllers/dashboardControllers");

const protectRoute = require("../validationMiddlewares/authMiddleware");

router.get("/", protectRoute, dashboardController.index);
router.get("/article", protectRoute, dashboardController.manageArticlePage);
router.get("/category", protectRoute, dashboardController.manageCategoryPage);
router.get("/users", protectRoute, dashboardController.manageUserPage);


// second router for manage article of dashboard (CRUD)
router2.get("/add", protectRoute, dashboardController.addArticlePage);
router2.get("/update", protectRoute, dashboardController.updateArticlePage);
router2.get("/send", protectRoute);

router.use("/article", router2);

module.exports = router;
