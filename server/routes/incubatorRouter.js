const express = require("express");
const IncubatorController = require("../controllers/IncubatorController.js");
const router = express.Router();
const UserMiddleware = require("../middleware/userMiddleware.js");

router.post("/eggs", UserMiddleware, IncubatorController.registerEggs);
router.get("/eggs", UserMiddleware, IncubatorController.getEggs);
router.get("/eggs/:id", UserMiddleware, IncubatorController.getEggsById);
router.put("/eggs/:id", UserMiddleware, IncubatorController.editEggsById);

module.exports = router;
