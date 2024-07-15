const express = require("express");
const router = express.Router();
const customerDeliveryPlantController = require("../controllers/customerDeliveryPlantController");

//getting all Delivery Plant Based On Customer
router.get("/:customerID",customerDeliveryPlantController.getAllDeliveryPlantBasedOnCustomer);

module.exports = router;
