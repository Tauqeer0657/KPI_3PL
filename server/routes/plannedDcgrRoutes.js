const express = require("express");
const router = express.Router();
const dcgrPlannedController = require("../controllers/plannedDcgrControllers");
const { upload } = require("../utils/multerConfiguration");

//uploading excel sheets to planned dcgr table
router.post("/upload", upload, dcgrPlannedController.uploadFile);

// fetch Dashboard Cards Statistics By CustomerID
router.get("/fetchDashboardCardsStatistics/:customerID", dcgrPlannedController.fetchDashboardCardsStatisticsByCustomerID);

// fetching Graph Statistics Of Planned DCGR By Customer
router.get("/fetchGraphStatisticsOfPlannedDCGRByCustomer/:customerID", dcgrPlannedController.fetchGraphStatisticsOfPlannedDCGRByCustomer);

module.exports = router;