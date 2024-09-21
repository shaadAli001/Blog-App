const express = require("express");
const { getAllUser, registerController, loginController } = require("../controllers/userController");
const router = express.Router();

// getUser
router.get("/allUser", getAllUser);

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

module.exports = router;