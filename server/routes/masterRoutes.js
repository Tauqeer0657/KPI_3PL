const express = require("express");
const router = express.Router();
const masterController = require("../controllers/masterControllers");
const { upload } = require("../utils/multerConfiguration");

//uploading excel sheets to the database
router.post("/upload", upload, masterController.uploadFile);

//getting all data of master table
router.get("/", masterController.getAllData);

// fetch Dashboard Statistics Based On Customer And Year Month
router.get('/fetchDashboardStatisticsBasedOnCustomerAndMonth/:customerID/:yearMonth',masterController.fetchDashboardStatisticsBasedOnCustomerAndMonth);

// fetch Dashboard Statistics Based On CustomerID yearMonth and delivery plant
router.get('/fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant/:customerID/:yearMonth/:deliveryPlant',masterController.fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant);

// fetch Planned DCGR Dashboard Statistics Based On Customer And Month
router.get('/fetchPlannedDCGRDashboardBasedOnCustomerAndMonth/:customerID/:yearMonth',masterController.fetchPlannedDCGRDashboardBasedOnCustomerAndMonth);

module.exports = router;

