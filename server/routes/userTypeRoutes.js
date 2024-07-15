const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const userTypeController = require("../controllers/userTypeController");

// getting all data from user type table
router.get("/", userTypeController.getAllData);

module.exports = router;