const express = require("express");
const router = express.Router();
const { homePage, addUser, updateUser, loginPage } = require("../services/render");
const controller = require("../controller/controller");
const jwt = require('jsonwebtoken');

router.get("/", homePage);
router.get("/add_user", addUser);
router.get("/update_user", updateUser);
router.get("/login", loginPage);

// API ROUTES
router.post("/api/users", controller.verifyUser, controller.addUser);
router.get("/api/users", controller.verifyUser, controller.findUser);
router.put("/api/users/:id", controller.verifyUser, controller.updateUser);
router.delete("/api/users/:id", controller.verifyUser, controller.deleteUser);
router.post("/api/_login", controller.login);
router.get("/api/logout", controller.logout);



module.exports = router;
