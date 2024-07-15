const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");

// uploading excel file into database

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
//       !excelData["DN SUMMERY-MAR-24"] ||
//       !Array.isArray(excelData["DN SUMMERY-MAR-24"])
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Invalid Excel format or missing sheet" });
//     }

//     const allRowsData = excelData["DN SUMMERY-MAR-24"];

//     if (allRowsData.length === 0) {
//       return res.status(400).json({ error: "Excel file is empty" });
//     }

//     const columnToKey = {
//       A: "transNumber",
//       B: "transDate",
//       C: "shipmentID",
//       D: "deliveryPlant",
//       E: "modeOfDelivery",
//       F: "vehicleNumber",
//       G: "vehicleType",
//       H: "sumOfVehicleCapacity",
//       I: "sumOfWeight",
//       J: "sumOfVolumetricCFT",
//       K: "sumOfVolumetricCFTIntoKg",
//       L: "sumOfChargeableWeightKg",
//       M: "vehicleUtilizationPercentage",
//       N: "woSerLineItem",
//       O: "woRateTrip",
//       P: "amount",
//       Q: "tripNumber",
//       R: "remark",
//       S: "justification",
//       T: "owmMax",
//       U: "diffWeight",
//     };

//     // Convert Excel data to JSON
//     const jsonData = allRowsData.map((row) => {
//       const jsonRow = {};
//       Object.keys(columnToKey).forEach((col) => {
//         if (columnToKey[col] === "vehicleUtilizationPercentage") {
//           // Multiply by 100 to convert it to percentage
//           jsonRow[columnToKey[col]] = row[col] ? row[col] * 100 : null;
//         } else {
//           // Check if row[col] is defined before calling toString()
//           jsonRow[columnToKey[col]] =
//             row[col] !== undefined && row[col] !== null
//               ? row[col].toString()
//               : null;
//         }
//       });
//       return jsonRow;
//     });

//     const dnSummaryData = jsonData.map((el) => {
//       return {
//         ...el,
//         customerID: customerID,
//         yearMonth: yearMonth,
//         createdBy: createdBy,
//       };
//     });

//     console.log(dnSummaryData);
//     let successCount = 0;

//     for (const data of dnSummaryData) {
//       try {
//         const request = getSqlRequest();
//         const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
//           .endOf("month")
//           .toDate();
//         await request
//           .input("customerID", sql.NVarChar, data.customerID)
//           .input("yearMonth", sql.Date, yearMonthDate)
//           .input("transNumber", sql.NVarChar, data.transNumber)
//           .input("transDate", sql.DateTime, new Date(data.transDate))
//           .input("shipmentID", sql.NVarChar, data.shipmentID)
//           .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
//           .input("modeOfDelivery", sql.NVarChar, data.modeOfDelivery)
//           .input("vehicleNumber", sql.NVarChar, data.vehicleNumber)
//           .input("vehicleType", sql.NVarChar, data.vehicleType)
//           .input("sumOfVehicleCapacity", sql.Decimal, data.sumOfVehicleCapacity)
//           .input("sumOfWeight", sql.Decimal, data.sumOfWeight)
//           .input("sumOfVolumetricCFT", sql.Decimal, data.sumOfVolumetricCFT)
//           .input(
//             "sumOfVolumetricCFTIntoKg",
//             sql.Decimal,
//             data.sumOfVolumetricCFTIntoKg
//           )
//           .input(
//             "sumOfChargeableWeightKg",
//             sql.Decimal,
//             data.sumOfChargeableWeightKg
//           )
//           .input(
//             "vehicleUtilizationPercentage",
//             sql.Decimal,
//             data.vehicleUtilizationPercentage
//           )
//           .input("woSerLineItem", sql.NVarChar, data.woSerLineItem)
//           .input("woRateTrip", sql.Decimal, data.woRateTrip)
//           .input("amount", sql.Decimal, data.amount)
//           .input("tripNumber", sql.NVarChar, data.tripNumber)
//           .input("remark", sql.NVarChar, data.remark)
//           .input("justification", sql.NVarChar, data.justification) // Truncate the justification data to fit the column size
//           .input("owmMax", sql.Decimal, data.owmMax)
//           .input("diffWeight", sql.Decimal, data.diffWeight)
//           .input("createdBy", sql.NVarChar, data.createdBy).query(`
//           INSERT INTO tb_owm_3pldsb_dn_summary_v1(customerID, yearMonth, transNumber, transDate, shipmentID, deliveryPlant, modeOfDelivery, vehicleNumber, vehicleType, sumOfVehicleCapacity, sumOfWeight, sumOfVolumetricCFT, sumOfVolumetricCFTIntoKg, sumOfChargeableWeightKg, vehicleUtilizationPercentage, woSerLineItem, woRateTrip, amount, tripNumber,  remark, justification, owmMax, diffWeight, createdDate, createdBy)
//           VALUES (@customerID, @yearMonth, @transNumber, @transDate, @shipmentID, @deliveryPlant, @modeOfDelivery, @vehicleNumber, @vehicleType, @sumOfVehicleCapacity, @sumOfWeight, @sumOfVolumetricCFT, @sumOfVolumetricCFTIntoKg, @sumOfChargeableWeightKg, @vehicleUtilizationPercentage, @woSerLineItem, @woRateTrip, @amount, @tripNumber, @remark, @justification, @owmMax, @diffWeight, GETDATE(), @createdBy)
//         `);
//         successCount++;
//       } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Something went wrong" });
//       }
//     }

//     console.log(`Total successful insertions: ${successCount}`);

//     if (successCount === dnSummaryData.length) {
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

// check duplicate file when file upload
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
      !excelData["DN SUMMERY-MAR-24"] ||
      !Array.isArray(excelData["DN SUMMERY-MAR-24"])
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Excel format or missing sheet" });
    }

    const allRowsData = excelData["DN SUMMERY-MAR-24"];

    if (allRowsData.length === 0) {
      return res.status(400).json({ error: "Excel file is empty" });
    }

    const columnToKey = {
      A: "transNumber",
      B: "transDate",
      C: "shipmentID",
      D: "deliveryPlant",
      E: "modeOfDelivery",
      F: "vehicleNumber",
      G: "vehicleType",
      H: "sumOfVehicleCapacity",
      I: "sumOfWeight",
      J: "sumOfVolumetricCFT",
      K: "sumOfVolumetricCFTIntoKg",
      L: "sumOfChargeableWeightKg",
      M: "vehicleUtilizationPercentage",
      N: "woSerLineItem",
      O: "woRateTrip",
      P: "amount",
      Q: "tripNumber",
      R: "remark",
      S: "justification",
      T: "owmMax",
      U: "diffWeight",
    };

    // Convert Excel data to JSON
    const jsonData = allRowsData.map((row) => {
      const jsonRow = {};
      Object.keys(columnToKey).forEach((col) => {
        if (columnToKey[col] === "vehicleUtilizationPercentage") {
          // Multiply by 100 to convert it to percentage
          jsonRow[columnToKey[col]] = row[col] ? row[col] * 100 : null;
        } else {
          // Check if row[col] is defined before calling toString()
          jsonRow[columnToKey[col]] =
            row[col] !== undefined && row[col] !== null
              ? row[col].toString()
              : null;
        }
      });
      return jsonRow;
    });

    const dnSummaryData = jsonData.map((el, index) => {
      return {
        ...el,
        id: `${yearMonth}-${index + 1}`,
        customerID: customerID,
        yearMonth: yearMonth,
        createdBy: createdBy,
      };
    });

    console.log(dnSummaryData);

    let successCount = 0;
    let duplicateCount = 0;
    const totalRecords = dnSummaryData.length;

    for (const data of dnSummaryData) {
      try {
        const request = getSqlRequest();
        const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
          .endOf("month")
          .toDate();

        // Check if the record already exists
        const result = await request
          .input("id", sql.NVarChar, data.id)
          .query(
            "SELECT COUNT(*) AS count FROM tb_owm_3pldsb_dn_summary_Test WHERE id = @id"
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
          .input("yearMonth", sql.Date, yearMonthDate)
          .input("transNumber", sql.NVarChar, data.transNumber)
          .input("transDate", sql.DateTime, new Date(data.transDate))
          .input("shipmentID", sql.NVarChar, data.shipmentID)
          .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
          .input("modeOfDelivery", sql.NVarChar, data.modeOfDelivery)
          .input("vehicleNumber", sql.NVarChar, data.vehicleNumber)
          .input("vehicleType", sql.NVarChar, data.vehicleType)
          .input("sumOfVehicleCapacity", sql.Decimal, data.sumOfVehicleCapacity)
          .input("sumOfWeight", sql.Decimal, data.sumOfWeight)
          .input("sumOfVolumetricCFT", sql.Decimal, data.sumOfVolumetricCFT)
          .input(
            "sumOfVolumetricCFTIntoKg",
            sql.Decimal,
            data.sumOfVolumetricCFTIntoKg
          )
          .input(
            "sumOfChargeableWeightKg",
            sql.Decimal,
            data.sumOfChargeableWeightKg
          )
          .input(
            "vehicleUtilizationPercentage",
            sql.Decimal,
            data.vehicleUtilizationPercentage
          )
          .input("woSerLineItem", sql.NVarChar, data.woSerLineItem)
          .input("woRateTrip", sql.Decimal, data.woRateTrip)
          .input("amount", sql.Decimal, data.amount)
          .input("tripNumber", sql.NVarChar, data.tripNumber)
          .input("remark", sql.NVarChar, data.remark)
          .input("justification", sql.NVarChar, data.justification) // Truncate the justification data to fit the column size
          .input("owmMax", sql.Decimal, data.owmMax)
          .input("diffWeight", sql.Decimal, data.diffWeight)
          .input("createdBy", sql.NVarChar, data.createdBy).query(`
          INSERT INTO tb_owm_3pldsb_dn_summary_Test( id, customerID, yearMonth, transNumber, transDate, shipmentID, deliveryPlant, modeOfDelivery, vehicleNumber, vehicleType, sumOfVehicleCapacity, sumOfWeight, sumOfVolumetricCFT, sumOfVolumetricCFTIntoKg, sumOfChargeableWeightKg, vehicleUtilizationPercentage, woSerLineItem, woRateTrip, amount, tripNumber,  remark, justification, owmMax, diffWeight, createdDate, createdBy)
          VALUES (@id, @customerID, @yearMonth, @transNumber, @transDate, @shipmentID, @deliveryPlant, @modeOfDelivery, @vehicleNumber, @vehicleType, @sumOfVehicleCapacity, @sumOfWeight, @sumOfVolumetricCFT, @sumOfVolumetricCFTIntoKg, @sumOfChargeableWeightKg, @vehicleUtilizationPercentage, @woSerLineItem, @woRateTrip, @amount, @tripNumber, @remark, @justification, @owmMax, @diffWeight, GETDATE(), @createdBy)
        `);
        successCount++;
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
      }
    }

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


//getting all data of dn summary 

exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest();

    const query = "SELECT * FROM tb_owm_3pldsb_dn_summary_v1";
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).send({
        message: "No data found in the dn summary table.",
      });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};



exports.fetchCardsStatisticsByCustomerIDAndMonth = async (req, res) => {
  const { customerID, yearMonth } = req.params;

  // Ensure customerID is provided
  if (!customerID || !yearMonth) {
    return res.status(400).send("customerID and yearMonth is required");
  }

  try {
    // Parse the yearMonth to match the database format
    let parsedYearMonth = moment(yearMonth, "MMMM-YYYY").endOf("month");
    // Adjust time to midnight UTC
    parsedYearMonth = parsedYearMonth.utc().startOf("day").toISOString();

    // Create a new SQL request instance
    let request = getSqlRequest();

    // Add customerID as a parameter to the request
    request.input("customerID", sql.NVarChar, customerID);
    // Add yearMonth as a parameter to the request
    request.input("yearMonth", sql.NVarChar, parsedYearMonth);

    // Define the SQL query using the parameter
    const result = await request.query(`
            SELECT
              (SELECT AVG(CAST(vehicleUtilizationPercentage AS FLOAT))
               FROM tb_owm_3pldsb_dn_summary_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS AvgVehicleUtilizationPercentage,

              (SELECT SUM(CAST(invoiceValue AS FLOAT))
               FROM tb_owm_3pldsb_master_data_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS SumOfInvoiceValue,

              (SELECT COUNT(DISTINCT transactionNo)
               FROM tb_owm_3pldsb_master_data_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS DistinctTransactionNumber,

              (SELECT SUM(noOfPackages)
               FROM tb_owm_3pldsb_master_data_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS SumOfNumberOfPackages,

              (SELECT COUNT(DISTINCT ecciCount)
               FROM tb_owm_3pldsb_master_data_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS DistinctEcciCount,

              (SELECT COUNT(tslGrnNumber)
               FROM tb_owm_3pldsb_master_data_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS DistinctTslGrnNumber,

              (SELECT SUM(threePLInvoiceValue)
               FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS SumOfThreePLInvoiceValue,

              (SELECT AVG(CAST(threePLInvoiceValuePercentage AS FLOAT))
               FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
               WHERE customerID = @customerID AND yearMonth = @yearMonth) AS AvgThreePLInvoiceValuePercentage
        `);

    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Something went wrong");
  }
}



// click functionality on dashboard cards statistics use for testing

// exports.fetchCardsStatistics = async (req, res) => {
//   const { customerID } = req.params;
//   const {
//     collectionCompliance,
//     dispatchCompliance,
//     deliveryPlant,
//     vehicleType,
//     modeOfDelivery,
//   } = req.query;

//   // Ensure customerID is provided
//   if (!customerID) {
//     return res.status(400).send("customerID is required");
//   }

//   try {
//     // Create a new SQL request instance
//     const request = new sql.Request();

//     // Add customerID as a parameter to avoid SQL injection
//     request.input("customerID", sql.NVarChar, customerID);

//     // Build the dynamic WHERE clause based on the provided query parameters
//     let whereClause = "WHERE customerID = @customerID";
//     let whereClauseExceptMasterTable = "WHERE customerID = @customerID";

//     if (collectionCompliance) {
//       whereClause += " AND collectionCompliance = @collectionCompliance";
//       request.input("collectionCompliance", sql.VarChar, collectionCompliance);
//     }
//     if (dispatchCompliance) {
//       whereClause += " AND dispatchCompliance = @dispatchCompliance";
//       request.input("dispatchCompliance", sql.VarChar, dispatchCompliance);
//     }
//     if (deliveryPlant) {
//       whereClause += " AND deliveryPlant = @deliveryPlant";
//       whereClauseExceptMasterTable += " AND deliveryPlant = @deliveryPlant";
//       request.input("deliveryPlant", sql.VarChar, deliveryPlant);
//     }
//     if (vehicleType) {
//       whereClause += " AND vehicleType = @vehicleType";
//       request.input("vehicleType", sql.VarChar, vehicleType);
//     }
//     if (modeOfDelivery) {
//       whereClause += " AND modeOfDelivery = @modeOfDelivery";
//       request.input("modeOfDelivery", sql.VarChar, modeOfDelivery);
//     }

//     // Define the SQL query using the parameters and dynamic WHERE clause
//     const query = `
//       SELECT 

//         (SELECT AVG(CAST(vehicleUtilizationPercentage AS FLOAT))
//          FROM tb_owm_3pldsb_dn_summary_v1
//          ${whereClauseExceptMasterTable}) AS AvgVehicleUtilizationPercentage,

//         (SELECT SUM(CAST(invoiceValue AS FLOAT))
//          FROM tb_owm_3pldsb_master_data_v1
//          ${whereClause}) AS SumOfInvoiceValue,

//         (SELECT COUNT(DISTINCT transactionNo)
//          FROM tb_owm_3pldsb_master_data_v1
//          ${whereClause}) AS DistinctTransactionNumber,

//         (SELECT SUM(noOfPackages)
//          FROM tb_owm_3pldsb_master_data_v1
//          ${whereClause}) AS SumOfNumberOfPackages,

//         (SELECT COUNT(DISTINCT ecciCount)
//          FROM tb_owm_3pldsb_master_data_v1
//          ${whereClause}) AS DistinctEcciCount,

//         (SELECT COUNT(tslGrnNumber)
//          FROM tb_owm_3pldsb_master_data_v1
//          ${whereClause}) AS DistinctTslGrnNumber,

//         (SELECT SUM(threePLInvoiceValue)
//          FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
//          ${whereClauseExceptMasterTable}) AS SumOfThreePLInvoiceValue,

//         (SELECT AVG(CAST(threePLInvoiceValuePercentage AS FLOAT))
//          FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1
//          ${whereClauseExceptMasterTable}) AS AvgThreePLInvoiceValuePercentage
//     `;

//     const result = await request.query(query);

//     // Parse the result
//     const statistics = {
//       AvgVehicleUtilizationPercentage: result.recordset[0].AvgVehicleUtilizationPercentage,
//       SumOfInvoiceValue: result.recordset[0].SumOfInvoiceValue,
//       DistinctTransactionNumber: result.recordset[0].DistinctTransactionNumber,
//       SumOfNumberOfPackages: result.recordset[0].SumOfNumberOfPackages,
//       DistinctEcciCount: result.recordset[0].DistinctEcciCount,
//       DistinctTslGrnNumber: result.recordset[0].DistinctTslGrnNumber,
//       SumOfThreePLInvoiceValue: result.recordset[0].SumOfThreePLInvoiceValue,
//       AvgThreePLInvoiceValuePercentage: result.recordset[0].AvgThreePLInvoiceValuePercentage
//     };

//     res.json(statistics);
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// };






// click functionality on dashboard cards statistics based on customerID and deliveryplant
  
exports.fetchCardsStatisticsByDeliveryPlant = async (req, res) => {
  const { customerID, yearMonth, deliveryPlant } = req.params;
  const {
    collectionCompliance,
    dispatchCompliance,
    vehicleType,
    modeOfDelivery,
  } = req.query;

  // Ensure customerID , yearMonth and delivery plant are provided
  if (!customerID || !yearMonth || !deliveryPlant) {
    return res
      .status(400)
      .send("customerID , yearMonth and delivery plant are required");
  }

  try {
    // Parse the yearMonth to match the database format
    let parsedYearMonth = moment(yearMonth, "MMMM-YYYY").endOf("month");
    // Adjust time to midnight UTC
    parsedYearMonth = parsedYearMonth.utc().startOf("day").toISOString();

    // Create a new SQL request instance
    const request = new sql.Request();

    // Add customerID as a parameter to avoid SQL injection
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
        
        (SELECT AVG(CAST(vehicleUtilizationPercentage AS FLOAT))
         FROM tb_owm_3pldsb_dn_summary_v1
         ${whereClauseExceptMasterTable}) AS AvgVehicleUtilizationPercentage,

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
    const statistics = [
      {
        AvgVehicleUtilizationPercentage:
          result.recordset[0].AvgVehicleUtilizationPercentage,
        SumOfInvoiceValue: result.recordset[0].SumOfInvoiceValue,
        DistinctTransactionNumber:
          result.recordset[0].DistinctTransactionNumber,
        SumOfNumberOfPackages: result.recordset[0].SumOfNumberOfPackages,
        DistinctEcciCount: result.recordset[0].DistinctEcciCount,
        DistinctTslGrnNumber: result.recordset[0].DistinctTslGrnNumber,
        SumOfThreePLInvoiceValue: result.recordset[0].SumOfThreePLInvoiceValue,
        AvgThreePLInvoiceValuePercentage:
          result.recordset[0].AvgThreePLInvoiceValuePercentage,
      },
    ];

    res.json(statistics);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};


