const express = require("express");
const AdminController = require("../controllers/AdminController.js");
const router = express.Router();
const UserMiddleware = require("../middleware/userMiddleware.js");

router.get("/", AdminController.index);
router.post("/register", UserMiddleware, AdminController.registerUser);
router.post("/login", AdminController.loginUser);
router.post("/userInfo",UserMiddleware, AdminController.userInfo);
router.post("/sms",UserMiddleware, AdminController.sms);
router.post("/sms-verification",UserMiddleware, AdminController.sms_verfication);

module.exports = router;
