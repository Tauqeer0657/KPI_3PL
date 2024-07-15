const express = require("express");
const router = express.Router();
const dcgrController = require("../controllers/dcgrController");
const { upload } = require("../utils/multerConfiguration");

//uploading excel sheets to the database
router.post("/upload", upload, dcgrController.uploadFile);

//getting all data from dcgr table
router.get("/",dcgrController.getAllData);


module.exports = router;
