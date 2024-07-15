const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

//getting all data of customer table
router.get("/",customerController.getAllData);

//Add customer
router.post("/",customerController.addCustomer);

module.exports = router;