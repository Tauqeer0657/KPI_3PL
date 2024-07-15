const { getSqlRequest } = require("../utils/dbUtils");
const excelToJson = require("convert-excel-to-json");
const { sql } = require("../db");
const moment = require("moment");

//upload excel file to the database

// exports.uploadFile = async (req, res) => {
//   try {
//     const file = req.file;

//     // Extract additional data from the request body
//     const { customerID, yearMonth, createdBy } = req.body;

//     if (!file) {
//       return res.status(400).json({ error: "File is missing" });
//     }

//     const excelData = excelToJson({
//       sourceFile: file.path,
//       header: {
//         rows: 1,
//       },
//     });

//     if (
//       !excelData ||
//       !excelData["master"] ||
//       !Array.isArray(excelData["master"])
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Invalid Excel format or missing sheet" });
//     }

//     const allRowsData = excelData["master"];

//     if (allRowsData.length === 0) {
//       return res.status(400).json({ error: "Excel file is empty" });
//     }

//     const columnToKey = {
//       A: "ecciCount",
//       B: "warehouse",
//       C: "customerCode",
//       D: "customerName",
//       E: "transactionType",
//       F: "modeOfDelivery",
//       G: "itemCode",
//       H: "itemName",
//       I: "location",
//       J: "jobNo",
//       K: "asnUploadDate",
//       L: "tslGrnNumber",
//       M: "grnUploadDate", // this is expected in future
//       N: "ecciNo",
//       O: "ecciDate",
//       P: "orderNumber",
//       Q: "invoiceNumber",
//       R: "invoiceDate",
//       S: "invoiceValue",
//       T: "vendorCode",
//       U: "vendorName",
//       V: "inRefNo",
//       W: "inDate",
//       X: "giNumber",
//       Y: "loadingID",
//       Z: "deliveryPlant",
//       AA: "storeLocation",
//       AB: "packageType",
//       AC: "vendorPackage",
//       AD: "noOfPackages",
//       AE: "weight",
//       AF: "length",
//       AG: "width",
//       AH: "height",
//       AI: "volume",
//       AJ: "vehicleType",
//       AK: "vehicleCapacity",
//       AL: "vehicleNumber",
//       AM: "transactionID",
//       AN: "transactionDate",
//       AO: "transactionNo",
//       AP: "boxID",
//       AQ: "transporter",
//       AR: "driverMobile",
//       AS: "driverName",
//       AT: "shiftID",
//       AU: "volumetricCFT",
//       AV: "volumetricCFTintoKG",
//       AW: "chargeableWeightKG",
//       AX: "owmWorkOrder",
//       AY: "asnToGrn",
//       AZ: "collectionCompliance",
//       BA: "remark1",
//       BB: "grnToDispatch",
//       BC: "dispatchCompliance",
//       BD: "remark2",
//     };

//     // Convert Excel data to JSON
//     const jsonData = allRowsData.map((row) => {
//       const jsonRow = {};
//       Object.keys(columnToKey).forEach((col) => {
//         jsonRow[columnToKey[col]] =
//           row[col] !== undefined && row[col] !== null
//             ? row[col].toString()
//             : null;
//       });
//       return jsonRow;
//     });

//     const masterData = jsonData.map((el) => {
//       return {
//         ...el,
//         customerID: customerID,
//         yearMonth: yearMonth,
//         createdBy: createdBy,
//       };
//     });

//     let successCount = 0;

//     for (const data of masterData) {
//       try {
//         const request = getSqlRequest();
//         const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
//           .endOf("month")
//           .toDate();
//         await request
//           .input("customerID", sql.NVarChar, data.customerID)
//           .input("yearMonth", sql.DateTime, yearMonthDate)
//           .input("ecciCount", sql.NVarChar, data.ecciCount)
//           .input("warehouse", sql.NVarChar, data.warehouse)
//           .input("customerCode", sql.NVarChar, data.customerCode)
//           .input("customerName", sql.NVarChar, data.customerName)
//           .input("transactionType", sql.NVarChar, data.transactionType)
//           .input("modeOfDelivery", sql.NVarChar, data.modeOfDelivery)
//           .input("itemCode", sql.NVarChar, data.itemCode)
//           .input("itemName", sql.NVarChar, data.itemName)
//           .input("location", sql.NVarChar, data.location)
//           .input("jobNo", sql.NVarChar, data.jobNo)
//           .input("asnUploadDate", sql.DateTime, new Date(data.asnUploadDate))
//           .input("tslGrnNumber", sql.NVarChar, data.tslGrnNumber)
//           .input("grnUploadDate", sql.DateTime, new Date(data.grnUploadDate))
//           .input("ecciNo", sql.NVarChar, data.ecciNo)
//           .input("ecciDate", sql.DateTime, new Date(data.ecciDate))
//           .input("orderNumber", sql.NVarChar, data.orderNumber)
//           .input("invoiceNumber", sql.NVarChar, data.invoiceNumber)
//           .input("invoiceDate", sql.DateTime, new Date(data.invoiceDate))
//           .input(
//             "invoiceValue",
//             sql.Decimal(18, 2),
//             parseFloat(data.invoiceValue)
//           )
//           .input("vendorCode", sql.NVarChar, data.vendorCode)
//           .input("vendorName", sql.NVarChar, data.vendorName)
//           .input("inRefNo", sql.NVarChar, data.inRefNo)
//           .input("inDate", sql.DateTime, new Date(data.inDate))
//           .input("giNumber", sql.NVarChar, data.giNumber)
//           .input("loadingID", sql.NVarChar, data.loadingID)
//           .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
//           .input("storeLocation", sql.NVarChar, data.storeLocation)
//           .input("packageType", sql.NVarChar, data.packageType)
//           .input("vendorPackage", sql.NVarChar, data.vendorPackage)
//           .input("noOfPackages", sql.Int, parseInt(data.noOfPackages))
//           .input("weight", sql.Decimal(18, 2), parseFloat(data.weight))
//           .input("length", sql.Decimal(18, 2), parseFloat(data.length))
//           .input("width", sql.Decimal(18, 2), parseFloat(data.width))
//           .input("height", sql.Decimal(18, 2), parseFloat(data.height))
//           .input("volume", sql.Decimal(18, 2), parseFloat(data.volume))
//           .input("vehicleType", sql.NVarChar, data.vehicleType)
//           .input(
//             "vehicleCapacity",
//             sql.Decimal(18, 2),
//             parseFloat(data.vehicleCapacity)
//           )
//           .input("vehicleNumber", sql.NVarChar, data.vehicleNumber)
//           .input("transactionID", sql.NVarChar, data.transactionID)
//           .input(
//             "transactionDate",
//             sql.DateTime,
//             new Date(data.transactionDate)
//           )
//           .input("transactionNo", sql.NVarChar, data.transactionNo)
//           .input("boxID", sql.NVarChar, data.boxID)
//           .input("transporter", sql.NVarChar, data.transporter)
//           .input("driverMobile", sql.NVarChar, data.driverMobile)
//           .input("driverName", sql.NVarChar, data.driverName)
//           .input("shiftID", sql.NVarChar, data.shiftID)
//           .input(
//             "volumetricCFT",
//             sql.Decimal(18, 2),
//             parseFloat(data.volumetricCFT)
//           )
//           .input(
//             "volumetricCFTintoKG",
//             sql.Decimal(18, 2),
//             parseFloat(data.volumetricCFTintoKG)
//           )
//           .input(
//             "chargeableWeightKG",
//             sql.Decimal(18, 2),
//             parseFloat(data.chargeableWeightKG)
//           )
//           .input("owmWorkOrder", sql.NVarChar, data.owmWorkOrder)
//           .input("asnToGrn", sql.Int, parseInt(data.asnToGrn))
//           .input(
//             "collectionCompliance",
//             sql.NVarChar,
//             data.collectionCompliance
//           )
//           .input("remark1", sql.NVarChar, data.remark1)
//           .input("grnToDispatch", sql.NVarChar, data.grnToDispatch) // Corrected column name
//           .input("dispatchCompliance", sql.NVarChar, data.dispatchCompliance)
//           .input("remark2", sql.NVarChar, data.remark2)
//           .input("createdBy", sql.NVarChar, data.createdBy).query(`
//             INSERT INTO tb_owm_3pldsb_master_data_v1(
//               customerID, yearMonth, ecciCount, warehouse, customerCode,
//               customerName, transactionType, modeOfDelivery, itemCode,
//               itemName, location, jobNo, asnUploadDate, tslGrnNumber,
//               grnUploadDate, ecciNo, ecciDate, orderNumber, invoiceNumber,
//               invoiceDate, invoiceValue, vendorCode, vendorName, inRefNo,
//               inDate, giNumber, loadingID, deliveryPlant, storeLocation,
//               packageType, vendorPackage, noOfPackages, weight, length,
//               width, height, volume, vehicleType, vehicleCapacity,
//               vehicleNumber, transactionID, transactionDate, transactionNo,
//               boxID, transporter, driverMobile, driverName, shiftID,
//               volumetricCFT, volumetricCFTintoKG, chargeableWeightKG,
//               owmWorkOrder, asnToGrn, collectionCompliance, remark1,
//               grnToDispatch, dispatchCompliance,remark2, createdDate, createdBy
//             )
//             VALUES (
//               @customerID, @yearMonth, @ecciCount, @warehouse, @customerCode,
//               @customerName, @transactionType, @modeOfDelivery, @itemCode,
//               @itemName, @location, @jobNo, @asnUploadDate, @tslGrnNumber,
//               @grnUploadDate, @ecciNo, @ecciDate, @orderNumber, @invoiceNumber,
//               @invoiceDate, @invoiceValue, @vendorCode, @vendorName, @inRefNo,
//               @inDate, @giNumber, @loadingID, @deliveryPlant, @storeLocation,
//               @packageType, @vendorPackage, @noOfPackages, @weight, @length,
//               @width, @height, @volume, @vehicleType, @vehicleCapacity,
//               @vehicleNumber, @transactionID, @transactionDate, @transactionNo,
//               @boxID, @transporter, @driverMobile, @driverName, @shiftID,
//               @volumetricCFT, @volumetricCFTintoKG, @chargeableWeightKG,
//               @owmWorkOrder, @asnToGrn, @collectionCompliance, @remark1,
//               @grnToDispatch, @dispatchCompliance, @remark2, GETDATE(), @createdBy
//             )
//           `);
//         successCount++;
//       } catch (error) {
//         console.error("Error inserting data:", error);
//       }
//     }
//     console.log(`Total successful insertions: ${successCount}`);

//     if (successCount === masterData.length) {
//       res
//         .status(200)
//         .json({
//           message: `All data inserted into the database  Count :  ${successCount}`,
//           count: successCount,
//         });
//     } else {
//       res
//         .status(500)
//         .json({
//           error: "Some data failed to insert into the database",
//           count: successCount,
//         });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    // Extract additional data from the request body
    const { customerID, yearMonth, createdBy } = req.body;

    if (!file) {
      return res.status(400).json({ error: "File is missing" });
    }

    const excelData = excelToJson({
      sourceFile: file.path,
      header: {
        rows: 1,
      },
    });

    if (
      !excelData ||
      !excelData["master"] ||
      !Array.isArray(excelData["master"])
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Excel format or missing sheet" });
    }

    const allRowsData = excelData["master"];

    if (allRowsData.length === 0) {
      return res.status(400).json({ error: "Excel file is empty" });
    }

    const columnToKey = {
      A: "ecciCount",
      B: "warehouse",
      C: "customerCode",
      D: "customerName",
      E: "transactionType",
      F: "modeOfDelivery",
      G: "itemCode",
      H: "itemName",
      I: "location",
      J: "jobNo",
      K: "asnUploadDate",
      L: "tslGrnNumber",
      M: "grnUploadDate", // this is expected in future
      N: "ecciNo",
      O: "ecciDate",
      P: "orderNumber",
      Q: "invoiceNumber",
      R: "invoiceDate",
      S: "invoiceValue",
      T: "vendorCode",
      U: "vendorName",
      V: "inRefNo",
      W: "inDate",
      X: "giNumber",
      Y: "loadingID",
      Z: "deliveryPlant",
      AA: "storeLocation",
      AB: "packageType",
      AC: "vendorPackage",
      AD: "noOfPackages",
      AE: "weight",
      AF: "length",
      AG: "width",
      AH: "height",
      AI: "volume",
      AJ: "vehicleType",
      AK: "vehicleCapacity",
      AL: "vehicleNumber",
      AM: "transactionID",
      AN: "transactionDate",
      AO: "transactionNo",
      AP: "boxID",
      AQ: "transporter",
      AR: "driverMobile",
      AS: "driverName",
      AT: "shiftID",
      AU: "volumetricCFT",
      AV: "volumetricCFTintoKG",
      AW: "chargeableWeightKG",
      AX: "owmWorkOrder",
      AY: "asnToGrn",
      AZ: "collectionCompliance",
      BA: "remark1",
      BB: "grnToDispatch",
      BC: "dispatchCompliance",
      BD: "remark2",
    };

    // Convert Excel data to JSON
    const jsonData = allRowsData.map((row) => {
      const jsonRow = {};
      Object.keys(columnToKey).forEach((col) => {
        jsonRow[columnToKey[col]] =
          row[col] !== undefined && row[col] !== null
            ? row[col].toString()
            : null;
      });
      return jsonRow;
    });

    const masterData = jsonData.map((el, index) => {
      return {
        ...el,
        id: `${yearMonth}-${index + 1}`,
        customerID: customerID,
        yearMonth: yearMonth,
        createdBy: createdBy,
      };
    });

    let successCount = 0;
    let duplicateCount = 0;
    const totalRecords = masterData.length;

    for (const data of masterData) {
      try {
        const request = getSqlRequest();
        const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
          .endOf("month")
          .toDate();

        // Check if the record already exists
        const result = await request
          .input("id", sql.NVarChar, data.id)
          .query(
            "SELECT COUNT(*) AS count FROM tb_owm_3pldsp_master_Test WHERE id = @id"
          );

        if (result.recordset[0].count > 0) {
          duplicateCount++;
          continue; // Skip inserting the duplicate record
        }

        // Create a new request object for the insert query
        const insertRequest = getSqlRequest();
        await insertRequest
          .input("id", sql.NVarChar, data.id)
          .input("customerID", sql.NVarChar, data.customerID)
          .input("yearMonth", sql.DateTime, yearMonthDate)
          .input("ecciCount", sql.NVarChar, data.ecciCount)
          .input("warehouse", sql.NVarChar, data.warehouse)
          .input("customerCode", sql.NVarChar, data.customerCode)
          .input("customerName", sql.NVarChar, data.customerName)
          .input("transactionType", sql.NVarChar, data.transactionType)
          .input("modeOfDelivery", sql.NVarChar, data.modeOfDelivery)
          .input("itemCode", sql.NVarChar, data.itemCode)
          .input("itemName", sql.NVarChar, data.itemName)
          .input("location", sql.NVarChar, data.location)
          .input("jobNo", sql.NVarChar, data.jobNo)
          .input("asnUploadDate", sql.DateTime, new Date(data.asnUploadDate))
          .input("tslGrnNumber", sql.NVarChar, data.tslGrnNumber)
          .input("grnUploadDate", sql.DateTime, new Date(data.grnUploadDate))
          .input("ecciNo", sql.NVarChar, data.ecciNo)
          .input("ecciDate", sql.DateTime, new Date(data.ecciDate))
          .input("orderNumber", sql.NVarChar, data.orderNumber)
          .input("invoiceNumber", sql.NVarChar, data.invoiceNumber)
          .input("invoiceDate", sql.DateTime, new Date(data.invoiceDate))
          .input(
            "invoiceValue",
            sql.Decimal(18, 2),
            parseFloat(data.invoiceValue)
          )
          .input("vendorCode", sql.NVarChar, data.vendorCode)
          .input("vendorName", sql.NVarChar, data.vendorName)
          .input("inRefNo", sql.NVarChar, data.inRefNo)
          .input("inDate", sql.DateTime, new Date(data.inDate))
          .input("giNumber", sql.NVarChar, data.giNumber)
          .input("loadingID", sql.NVarChar, data.loadingID)
          .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
          .input("storeLocation", sql.NVarChar, data.storeLocation)
          .input("packageType", sql.NVarChar, data.packageType)
          .input("vendorPackage", sql.NVarChar, data.vendorPackage)
          .input("noOfPackages", sql.Int, parseInt(data.noOfPackages))
          .input("weight", sql.Decimal(18, 2), parseFloat(data.weight))
          .input("length", sql.Decimal(18, 2), parseFloat(data.length))
          .input("width", sql.Decimal(18, 2), parseFloat(data.width))
          .input("height", sql.Decimal(18, 2), parseFloat(data.height))
          .input("volume", sql.Decimal(18, 2), parseFloat(data.volume))
          .input("vehicleType", sql.NVarChar, data.vehicleType)
          .input(
            "vehicleCapacity",
            sql.Decimal(18, 2),
            parseFloat(data.vehicleCapacity)
          )
          .input("vehicleNumber", sql.NVarChar, data.vehicleNumber)
          .input("transactionID", sql.NVarChar, data.transactionID)
          .input(
            "transactionDate",
            sql.DateTime,
            new Date(data.transactionDate)
          )
          .input("transactionNo", sql.NVarChar, data.transactionNo)
          .input("boxID", sql.NVarChar, data.boxID)
          .input("transporter", sql.NVarChar, data.transporter)
          .input("driverMobile", sql.NVarChar, data.driverMobile)
          .input("driverName", sql.NVarChar, data.driverName)
          .input("shiftID", sql.NVarChar, data.shiftID)
          .input(
            "volumetricCFT",
            sql.Decimal(18, 2),
            parseFloat(data.volumetricCFT)
          )
          .input(
            "volumetricCFTintoKG",
            sql.Decimal(18, 2),
            parseFloat(data.volumetricCFTintoKG)
          )
          .input(
            "chargeableWeightKG",
            sql.Decimal(18, 2),
            parseFloat(data.chargeableWeightKG)
          )
          .input("owmWorkOrder", sql.NVarChar, data.owmWorkOrder)
          .input("asnToGrn", sql.Int, parseInt(data.asnToGrn))
          .input(
            "collectionCompliance",
            sql.NVarChar,
            data.collectionCompliance
          )
          .input("remark1", sql.NVarChar, data.remark1)
          .input("grnToDispatch", sql.NVarChar, data.grnToDispatch) // Corrected column name
          .input("dispatchCompliance", sql.NVarChar, data.dispatchCompliance)
          .input("remark2", sql.NVarChar, data.remark2)
          .input("createdBy", sql.NVarChar, data.createdBy).query(`
            INSERT INTO tb_owm_3pldsp_master_Test(
              id, customerID, yearMonth, ecciCount, warehouse, customerCode,
              customerName, transactionType, modeOfDelivery, itemCode,
              itemName, location, jobNo, asnUploadDate, tslGrnNumber,
              grnUploadDate, ecciNo, ecciDate, orderNumber, invoiceNumber,
              invoiceDate, invoiceValue, vendorCode, vendorName, inRefNo,
              inDate, giNumber, loadingID, deliveryPlant, storeLocation,
              packageType, vendorPackage, noOfPackages, weight, length,
              width, height, volume, vehicleType, vehicleCapacity,
              vehicleNumber, transactionID, transactionDate, transactionNo,
              boxID, transporter, driverMobile, driverName, shiftID,
              volumetricCFT, volumetricCFTintoKG, chargeableWeightKG,
              owmWorkOrder, asnToGrn, collectionCompliance, remark1,
              grnToDispatch, dispatchCompliance,remark2, createdDate, createdBy
            )
            VALUES (
             @id, @customerID, @yearMonth, @ecciCount, @warehouse, @customerCode,
              @customerName, @transactionType, @modeOfDelivery, @itemCode,
              @itemName, @location, @jobNo, @asnUploadDate, @tslGrnNumber,
              @grnUploadDate, @ecciNo, @ecciDate, @orderNumber, @invoiceNumber,
              @invoiceDate, @invoiceValue, @vendorCode, @vendorName, @inRefNo,
              @inDate, @giNumber, @loadingID, @deliveryPlant, @storeLocation,
              @packageType, @vendorPackage, @noOfPackages, @weight, @length,
              @width, @height, @volume, @vehicleType, @vehicleCapacity,
              @vehicleNumber, @transactionID, @transactionDate, @transactionNo,
              @boxID, @transporter, @driverMobile, @driverName, @shiftID,
              @volumetricCFT, @volumetricCFTintoKG, @chargeableWeightKG,
              @owmWorkOrder, @asnToGrn, @collectionCompliance, @remark1,
              @grnToDispatch, @dispatchCompliance, @remark2, GETDATE(), @createdBy
            )
          `);
        successCount++;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
    console.log(`Total successful insertions: ${successCount}`);

    console.log(`Total records in file: ${totalRecords}`);
    console.log(`Total successful insertions: ${successCount}`);
    console.log(`Total duplicate records skipped: ${duplicateCount}`);

    res.status(200).json({
      message: `Data processing complete. Total records: ${totalRecords}, Successful insertions: ${successCount}, Duplicate records skipped: ${duplicateCount}`,
      totalRecords,
      successCount,
      duplicateCount,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//getting all data of master table

exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest();

    const query = "SELECT * FROM tb_owm_3pldsb_master_data_v1";
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).send({
        message: "No data found in the master table.",
      });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// fetch Dashboard Statistics Based On CustomerID And yearMonth

exports.fetchDashboardStatisticsBasedOnCustomerAndMonth = async (req, res) => {
  const { customerID, yearMonth } = req.params;
  const {
    collectionCompliance,
    dispatchCompliance,
    deliveryPlant,
    vehicleType,
    modeOfDelivery,
  } = req.query;

  // Ensure customerID and yearMonth are provided
  if (!customerID || !yearMonth) {
    return res.status(400).send("customerID and yearMonth are required");
  }

  try {
    // Parse the yearMonth to match the database format
    let parsedYearMonth = moment(yearMonth, "MMMM-YYYY").endOf("month");
    // Adjust time to midnight UTC
    parsedYearMonth = parsedYearMonth.utc().startOf("day").toISOString();

    // Create a new SQL request instance
    const request = await getSqlRequest();

    // Add customerID and yearMonth as parameters to avoid SQL injection
    request.input("customerID", sql.NVarChar, customerID);
    request.input("yearMonth", sql.DateTime, parsedYearMonth);

    // Build the dynamic WHERE clause based on the provided query parameters
    let whereClause =
      "WHERE customerID = @customerID AND yearMonth = @yearMonth";
    let whereClauseExceptMasterTable =
      "WHERE customerID = @customerID AND yearMonth = @yearMonth";

    if (collectionCompliance) {
      whereClause += " AND collectionCompliance = @collectionCompliance";
      request.input("collectionCompliance", sql.VarChar, collectionCompliance);
    }
    if (dispatchCompliance) {
      whereClause += " AND dispatchCompliance = @dispatchCompliance";
      request.input("dispatchCompliance", sql.VarChar, dispatchCompliance);
    }
    if (deliveryPlant) {
      whereClause += " AND deliveryPlant = @deliveryPlant";
      whereClauseExceptMasterTable += " AND deliveryPlant = @deliveryPlant";
      request.input("deliveryPlant", sql.VarChar, deliveryPlant);
    }
    if (vehicleType) {
      whereClause += " AND vehicleType = @vehicleType";
      request.input("vehicleType", sql.VarChar, vehicleType);
    }
    if (modeOfDelivery) {
      whereClause += " AND modeOfDelivery = @modeOfDelivery";
      request.input("modeOfDelivery", sql.VarChar, modeOfDelivery);
    }

    // Define the SQL query using the parameters and dynamic WHERE clause
    const query = `
      SELECT 
        (SELECT deliveryPlant, AVG(CAST(vehicleUtilizationPercentage AS FLOAT)) AS AverageVehicleUtilizationPercentage
         FROM tb_owm_3pldsb_dn_summary_v1
         ${whereClauseExceptMasterTable}
         GROUP BY deliveryPlant
         ORDER BY deliveryPlant
        FOR JSON PATH) AS AverageVehicleUtilizationPercentageByDeliveryPlant,

        (SELECT collectionCompliance, COUNT(ecciCount) AS ecciCount
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY collectionCompliance
         ORDER BY collectionCompliance
        FOR JSON PATH) AS EcciCountByCollectionCompliance,

        (SELECT dispatchCompliance, COUNT(ecciCount) AS ecciCount
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY dispatchCompliance
         ORDER BY dispatchCompliance
        FOR JSON PATH) AS EcciCountByDispatchCompliance,

        (SELECT deliveryPlant, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY deliveryPlant
         ORDER BY deliveryPlant
        FOR JSON PATH) AS TransactionNumberByDeliveryPlant,

        (SELECT vehicleType, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY vehicleType
         ORDER BY vehicleType
        FOR JSON PATH) AS TransactionNumberByVehicleType,

        (SELECT modeOfDelivery, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY modeOfDelivery
         ORDER BY modeOfDelivery
        FOR JSON PATH) AS TransactionNumberByModeOfDelivery,

        (SELECT AVG(CAST(vehicleUtilizationPercentage AS FLOAT))
         FROM tb_owm_3pldsb_dn_summary_v1
         ${whereClauseExceptMasterTable}) AS AverageVehicleUtilizationPercentage,

        (SELECT SUM(CAST(invoiceValue AS FLOAT))
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS SumOfInvoiceValue,

        (SELECT COUNT(DISTINCT transactionNo)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctTransactionNumber,

        (SELECT SUM(noOfPackages)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS SumOfNumberOfPackages,

        (SELECT COUNT(DISTINCT ecciCount)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctEcciCount,

        (SELECT COUNT(tslGrnNumber)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctTslGrnNumber,

        (SELECT SUM(threePLInvoiceValue)
         FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
         ${whereClauseExceptMasterTable}) AS SumOfThreePLInvoiceValue,

        (SELECT AVG(CAST(threePLInvoiceValuePercentage AS FLOAT))
         FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
         ${whereClauseExceptMasterTable}) AS AvgThreePLInvoiceValuePercentage
    `;

    const result = await request.query(query);

    // Parse the result
    const statistics = {
      AverageVehicleUtilizationPercentageByDeliveryPlant: JSON.parse(
        result.recordset[0].AverageVehicleUtilizationPercentageByDeliveryPlant
      ),
      EcciCountByCollectionCompliance: JSON.parse(
        result.recordset[0].EcciCountByCollectionCompliance
      ),
      EcciCountByDispatchCompliance: JSON.parse(
        result.recordset[0].EcciCountByDispatchCompliance
      ),
      TransactionNumberByDeliveryPlant: JSON.parse(
        result.recordset[0].TransactionNumberByDeliveryPlant
      ),
      TransactionNumberByVehicleType: JSON.parse(
        result.recordset[0].TransactionNumberByVehicleType
      ),
      TransactionNumberByModeOfDelivery: JSON.parse(
        result.recordset[0].TransactionNumberByModeOfDelivery
      ),
      AverageVehicleUtilizationPercentage:
        result.recordset[0].AverageVehicleUtilizationPercentage,
      SumOfInvoiceValue: result.recordset[0].SumOfInvoiceValue,
      DistinctTransactionNumber: result.recordset[0].DistinctTransactionNumber,
      SumOfNumberOfPackages: result.recordset[0].SumOfNumberOfPackages,
      DistinctEcciCount: result.recordset[0].DistinctEcciCount,
      DistinctTslGrnNumber: result.recordset[0].DistinctTslGrnNumber,
      SumOfThreePLInvoiceValue: result.recordset[0].SumOfThreePLInvoiceValue,
      AvgThreePLInvoiceValuePercentage:
        result.recordset[0].AvgThreePLInvoiceValuePercentage,
    };

    res.json(statistics);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// fetch Dashboard Statistics Based On CustomerID yearMonth and delivery plant

exports.fetchDashboardStatisticsBasedOnCustomerMonthAndDeliveryPlant = async (req, res) => {
  const { customerID, yearMonth, deliveryPlant } = req.params;
  const {
    collectionCompliance,
    dispatchCompliance,
    vehicleType,
    modeOfDelivery,
  } = req.query;

  // Ensure customerID , yearMonth and delivery plant are provided
  if (!customerID || !yearMonth || !deliveryPlant) {
    return res.status(400).send("customerID , yearMonth and delivery plant are required");
  }

  try {
    // Parse the yearMonth to match the database format
    let parsedYearMonth = moment(yearMonth, "MMMM-YYYY").endOf("month");
    // Adjust time to midnight UTC
    parsedYearMonth = parsedYearMonth.utc().startOf("day").toISOString();

    // Create a new SQL request instance
    const request = await getSqlRequest();

    // Add customerID ,yearMonth and delivery plant as parameters to avoid SQL injection
    request.input("customerID", sql.NVarChar, customerID);
    request.input("deliveryPlant", sql.NVarChar, deliveryPlant);
    request.input("yearMonth", sql.DateTime, parsedYearMonth);

    // Build the dynamic WHERE clause based on the provided query parameters
    let whereClause =
      "WHERE customerID = @customerID AND yearMonth = @yearMonth AND deliveryPlant = @deliveryPlant";
    let whereClauseExceptMasterTable =
      "WHERE customerID = @customerID AND yearMonth = @yearMonth AND deliveryPlant = @deliveryPlant";

    if (collectionCompliance) {
      whereClause += " AND collectionCompliance = @collectionCompliance";
      request.input("collectionCompliance", sql.VarChar, collectionCompliance);
    }
    if (dispatchCompliance) {
      whereClause += " AND dispatchCompliance = @dispatchCompliance";
      request.input("dispatchCompliance", sql.VarChar, dispatchCompliance);
    }
    if (vehicleType) {
      whereClause += " AND vehicleType = @vehicleType";
      request.input("vehicleType", sql.VarChar, vehicleType);
    }
    if (modeOfDelivery) {
      whereClause += " AND modeOfDelivery = @modeOfDelivery";
      request.input("modeOfDelivery", sql.VarChar, modeOfDelivery);
    }

    // Define the SQL query using the parameters and dynamic WHERE clause
    const query = `
      SELECT 
        (SELECT deliveryPlant, AVG(CAST(vehicleUtilizationPercentage AS FLOAT)) AS AverageVehicleUtilizationPercentage
         FROM tb_owm_3pldsb_dn_summary_v1
         ${whereClauseExceptMasterTable}
         GROUP BY deliveryPlant
         ORDER BY deliveryPlant
        FOR JSON PATH) AS AverageVehicleUtilizationPercentageByDeliveryPlant,

        (SELECT collectionCompliance, COUNT(ecciCount) AS ecciCount
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY collectionCompliance
         ORDER BY collectionCompliance
        FOR JSON PATH) AS EcciCountByCollectionCompliance,

        (SELECT dispatchCompliance, COUNT(ecciCount) AS ecciCount
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY dispatchCompliance
         ORDER BY dispatchCompliance
        FOR JSON PATH) AS EcciCountByDispatchCompliance,

        (SELECT deliveryPlant, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY deliveryPlant
         ORDER BY deliveryPlant
        FOR JSON PATH) AS TransactionNumberByDeliveryPlant,

        (SELECT vehicleType, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY vehicleType
         ORDER BY vehicleType
        FOR JSON PATH) AS TransactionNumberByVehicleType,

        (SELECT modeOfDelivery, COUNT(DISTINCT transactionNo) AS TransactionNumber
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}
         GROUP BY modeOfDelivery
         ORDER BY modeOfDelivery
        FOR JSON PATH) AS TransactionNumberByModeOfDelivery,

        (SELECT AVG(CAST(vehicleUtilizationPercentage AS FLOAT))
         FROM tb_owm_3pldsb_dn_summary_v1
         ${whereClauseExceptMasterTable}) AS AverageVehicleUtilizationPercentage,

        (SELECT SUM(CAST(invoiceValue AS FLOAT))
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS SumOfInvoiceValue,

        (SELECT COUNT(DISTINCT transactionNo)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctTransactionNumber,

        (SELECT SUM(noOfPackages)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS SumOfNumberOfPackages,

        (SELECT COUNT(DISTINCT ecciCount)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctEcciCount,

        (SELECT COUNT(tslGrnNumber)
         FROM tb_owm_3pldsb_master_data_v1
         ${whereClause}) AS DistinctTslGrnNumber,

        (SELECT SUM(threePLInvoiceValue)
         FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
         ${whereClauseExceptMasterTable}) AS SumOfThreePLInvoiceValue,

        (SELECT AVG(CAST(threePLInvoiceValuePercentage AS FLOAT))
         FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
         ${whereClauseExceptMasterTable}) AS AvgThreePLInvoiceValuePercentage
    `;

    const result = await request.query(query);

    // Parse the result
    const statistics = {
      AverageVehicleUtilizationPercentageByDeliveryPlant: JSON.parse(
        result.recordset[0].AverageVehicleUtilizationPercentageByDeliveryPlant
      ),
      EcciCountByCollectionCompliance: JSON.parse(
        result.recordset[0].EcciCountByCollectionCompliance
      ),
      EcciCountByDispatchCompliance: JSON.parse(
        result.recordset[0].EcciCountByDispatchCompliance
      ),
      TransactionNumberByDeliveryPlant: JSON.parse(
        result.recordset[0].TransactionNumberByDeliveryPlant
      ),
      TransactionNumberByVehicleType: JSON.parse(
        result.recordset[0].TransactionNumberByVehicleType
      ),
      TransactionNumberByModeOfDelivery: JSON.parse(
        result.recordset[0].TransactionNumberByModeOfDelivery
      ),
      AverageVehicleUtilizationPercentage:
        result.recordset[0].AverageVehicleUtilizationPercentage,
      SumOfInvoiceValue: result.recordset[0].SumOfInvoiceValue,
      DistinctTransactionNumber: result.recordset[0].DistinctTransactionNumber,
      SumOfNumberOfPackages: result.recordset[0].SumOfNumberOfPackages,
      DistinctEcciCount: result.recordset[0].DistinctEcciCount,
      DistinctTslGrnNumber: result.recordset[0].DistinctTslGrnNumber,
      SumOfThreePLInvoiceValue: result.recordset[0].SumOfThreePLInvoiceValue,
      AvgThreePLInvoiceValuePercentage:
        result.recordset[0].AvgThreePLInvoiceValuePercentage,
    };

    res.json(statistics);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// fetch Planned DCGR Dashboard Statistics Based On Customer And Month

exports.fetchPlannedDCGRDashboardBasedOnCustomerAndMonth = async (req, res) => {
  const { customerID, yearMonth } = req.params;
  const { deliveryPlant } = req.query;

  // Ensure customerID and yearMonth are provided
  if (!customerID || !yearMonth) {
    return res.status(400).send("customerID and yearMonth are required");
  }

  try {
    // Parse the yearMonth to match the database format
    let parsedYearMonth = moment(yearMonth, "MMMM-YYYY").endOf("month");
    // Adjust time to midnight UTC
    parsedYearMonth = parsedYearMonth.utc().startOf("day").toISOString();

    // Create a new SQL request instance
    const request = await getSqlRequest();

    // Add customerID and yearMonth as parameters to avoid SQL injection
    request.input("customerID", sql.NVarChar, customerID);
    request.input("yearMonth", sql.DateTime, parsedYearMonth);

    // Build the dynamic WHERE clause based on the provided query parameters
    let whereClause =
      "WHERE customerID = @customerID AND yearMonth = @yearMonth";

    if (deliveryPlant) {
      whereClause += " AND deliveryPlant = @deliveryPlant";
      request.input("deliveryPlant", sql.VarChar, deliveryPlant);
    }

    // Define the SQL query using the parameters
    const query = `
    SELECT 
    (SELECT deliveryPlant, SUM(CAST(tslSavingIRS AS FLOAT)) AS SumOfTslSavingIRS
     FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
     ${whereClause}
     GROUP BY deliveryPlant
     ORDER BY deliveryPlant
     FOR JSON PATH) AS SumOfTslSavingIRSByDeliveryPlant,

    (SELECT deliveryPlant, AVG(CAST(plannedDCGRPercentage AS FLOAT)) AS AvgPlannedDCGRPercentage, AVG(CAST(threePLActualDCGRPercentage AS FLOAT)) AS AvgThreePLActualDCGRPercentage
     FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
     ${whereClause}
     GROUP BY deliveryPlant
     ORDER BY deliveryPlant
     FOR JSON PATH) AS AveragePlannedAndActualDCGRPercentageByDeliveryPlant,

    (SELECT deliveryPlant, SUM(CAST(planned3PLInvoiceValue AS FLOAT)) AS SumPlanned3PLInvoiceValue, SUM(CAST(threePLInvoiceValue AS FLOAT)) AS SumThreePLInvoiceValue
     FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
     ${whereClause}
     GROUP BY deliveryPlant
     ORDER BY deliveryPlant
     FOR JSON PATH) AS SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant,

    (SELECT SUM(CAST(totalPoValue AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS SumOfTotalPoValue,

    (SELECT AVG(CAST(plannedDCGRPercentage AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS AveragePlannedDCGRPercentage,

    (SELECT AVG(CAST(threePLActualDCGRPercentage AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS AveragethreePLActualDCGRPercentage,

    (SELECT SUM(CAST(planned3PLInvoiceValue AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS SumOfPlanned3PLInvoiceValue,

    (SELECT SUM(CAST(threePLInvoiceValue AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS SumOfthreePLInvoiceValue,

    (SELECT SUM(CAST(tslSavingIRS AS FLOAT))
      FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1
      ${whereClause}) AS SumOftslSavingIRS
    `;

    const result = await request.query(query);

    // Parse the result
    const SumOfTslSavingIRSByDeliveryPlant = JSON.parse(
      result.recordset[0].SumOfTslSavingIRSByDeliveryPlant
    );

    // Calculate the total of SumOfTslSavingIRS
    const totalSumOfTslSavingIRS = SumOfTslSavingIRSByDeliveryPlant.reduce(
      (total, item) => total + item.SumOfTslSavingIRS,
      0
    );

    // Parse the result
    const statistics = {
      SumOfTslSavingIRSByDeliveryPlant,
      TotalSumOfTslSavingIRS: totalSumOfTslSavingIRS,
      AveragePlannedAndActualDCGRPercentageByDeliveryPlant: JSON.parse(
        result.recordset[0].AveragePlannedAndActualDCGRPercentageByDeliveryPlant
      ),
      SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant: JSON.parse(
        result.recordset[0].SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant
      ),
      SumOfTotalPoValue: result.recordset[0].SumOfTotalPoValue,
      AveragePlannedDCGRPercentage:
        result.recordset[0].AveragePlannedDCGRPercentage,
      AveragethreePLActualDCGRPercentage:
        result.recordset[0].AveragethreePLActualDCGRPercentage,
      SumOfPlanned3PLInvoiceValue:
        result.recordset[0].SumOfPlanned3PLInvoiceValue,
      SumOfthreePLInvoiceValue: result.recordset[0].SumOfthreePLInvoiceValue,
      SumOftslSavingIRS: result.recordset[0].SumOftslSavingIRS,
    };

    res.json(statistics);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};
