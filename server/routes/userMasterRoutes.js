const express = require("express");
const router = express.Router();
const userMasterController = require("../controllers/userMasterController");

// getting all users from user master table
router.get("/", userMasterController.getAllData);

// Add user to user master table
router.post("/", userMasterController.addUser);

// Update userDetails on user master table
router.patch("/update/:userID", userMasterController.updateUserDetails);

//login functionality
router.post("/login", userMasterController.loginUser);


module.exports = router;
