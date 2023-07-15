const express = require("express");
const AdminController = require("../controllers/AdminController.js");
const router = express.Router();
const UserMiddleware = require("../middleware/userMiddleware.js");

router.get("/users",UserMiddleware, AdminController.getUsers);
router.get("/users/:id",UserMiddleware, AdminController.getUserById);
router.put("/users/:id",UserMiddleware, AdminController.editUserById);
router.delete("/users/:id", UserMiddleware, AdminController.deleteUserById);

router.post("/drugs",UserMiddleware, AdminController.createDrugs);
router.get("/drugs",UserMiddleware, AdminController.getDrugs);
router.get("/drugs/:id",UserMiddleware, AdminController.getDrugsById);
router.put("/drugs/:id",UserMiddleware, AdminController.editDrugById);
router.delete("/drugs/:id", UserMiddleware, AdminController.deleteDrugById);

router.post("/dizenfeksiya",UserMiddleware, AdminController.createdizenfeksiya);
router.get("/dizenfeksiya",UserMiddleware, AdminController.getdizenfeksiya);
router.get("/dizenfeksiya/:id",UserMiddleware, AdminController.getdizenfeksiyaById);
router.put("/dizenfeksiya/:id",UserMiddleware, AdminController.editdizenfeksiyaById);
router.delete("/dizenfeksiya/:id", UserMiddleware, AdminController.deletedizenfeksiyaById);
module.exports = router;
