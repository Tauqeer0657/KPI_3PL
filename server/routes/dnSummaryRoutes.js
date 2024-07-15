const express = require("express");
const router = express.Router();
const dnSummaryController = require("../controllers/dnSummaryController");
const { upload } = require("../utils/multerConfiguration");

//uploading excel sheets to the database
router.post("/upload", upload, dnSummaryController.uploadFile);

//getting all data of dn summary
router.get("/", dnSummaryController.getAllData);

//fetching dashboard cards statistics by customer id and yearMonth-use for test purpose
router.get(
  "/fetchCardsStatisticsByDeliveryPlant/:customerID/:yearMonth/All",
  dnSummaryController.fetchCardsStatisticsByCustomerIDAndMonth
);

// clicking functionality on dashboard cards based on customer id and delivery plant
router.get(
  "/fetchCardsStatisticsByDeliveryPlant/:customerID/:yearMonth/:deliveryPlant",
  dnSummaryController.fetchCardsStatisticsByDeliveryPlant
);

module.exports = router;
