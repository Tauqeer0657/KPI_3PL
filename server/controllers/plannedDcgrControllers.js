const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");

//uploading excel sheets to planned dcgr table

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
//       !excelData["planned_DCGR"] ||
//       !Array.isArray(excelData["planned_DCGR"])
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Invalid Excel format or missing sheet" });
//     }

//     const allRowsData = excelData["planned_DCGR"];

//     if (allRowsData.length === 0) {
//       return res.status(400).json({ error: "Excel file is empty" });
//     }

//     const columnToKey = {
//       A: "deliveryPlant",
//       B: "totalPoValue",
//       C: "plannedDCGRPercentage",
//       D: "threePLActualDCGRPercentage",
//       E: "planned3PLInvoiceValue",
//       F: "threePLInvoiceValue",
//       G: "tslSavingIRS",
//     };

//     // Convert Excel data to JSON
//     const jsonData = allRowsData.map((row) => {
//       const jsonRow = {};
//       Object.keys(columnToKey).forEach((col) => {
//         if (columnToKey[col] === "threePLActualDCGRPercentage") {
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

//     const gcgrData = jsonData.map((el) => {
//       return {
//         ...el,
//         customerID: customerID,
//         yearMonth: yearMonth,
//         createdBy: createdBy,
//       };
//     });

//     let successCount = 0;

//     for (const data of gcgrData) {
//       try {
//         const request = getSqlRequest();
//         const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
//           .endOf("month")
//           .toDate();

//         await request
//           .input("customerID", sql.NVarChar, data.customerID)
//           .input("yearMonth", sql.DateTime, yearMonthDate)
//           .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
//           .input(
//             "totalPoValue",
//             sql.Decimal(18, 2),
//             parseFloat(data.totalPoValue)
//           )
//           .input(
//             "plannedDCGRPercentage",
//             sql.Decimal(5, 2),
//             parseFloat(data.plannedDCGRPercentage)
//           )
//           .input(
//             "threePLActualDCGRPercentage",
//             sql.Decimal(5, 2),
//             parseFloat(data.threePLActualDCGRPercentage)
//           )
//           .input(
//             "planned3PLInvoiceValue",
//             sql.Decimal(18, 2),
//             parseFloat(data.planned3PLInvoiceValue)
//           )
//           .input(
//             "threePLInvoiceValue",
//             sql.Decimal(18, 2),
//             parseFloat(data.threePLInvoiceValue)
//           )
//           .input(
//             "tslSavingIRS",
//             sql.Decimal(18, 2),
//             parseFloat(data.tslSavingIRS)
//           )
//           .input("createdBy", sql.NVarChar, data.createdBy).query(`
//                         INSERT INTO tb_owm_3pldsb_planned_dcgr_value_vs_actual_v1(
//                           customerID, yearMonth, deliveryPlant, totalPoValue, plannedDCGRPercentage,
//                           threePLActualDCGRPercentage, planned3PLInvoiceValue, threePLInvoiceValue, tslSavingIRS ,createdDate, createdBy
//                         ) VALUES (
//                           @customerID, @yearMonth, @deliveryPlant, @totalPoValue, @plannedDCGRPercentage,
//                           @threePLActualDCGRPercentage, @planned3PLInvoiceValue, @threePLInvoiceValue, @tslSavingIRS, GETDATE(), @createdBy
//                         )
//                       `);
//         successCount++;
//       } catch (error) {
//         console.error("Error inserting data:", error);
//       }
//     }

//     console.log(`Total successful insertions: ${successCount}`);

//     if (successCount === gcgrData.length) {
//       res.status(200).json({
//         message: `All data inserted into the database  Count :  ${successCount}`,
//         count: successCount,
//       });
//     } else {
//       res.status(500).json({
//         error: "Some data failed to insert into the database",
//         count: successCount,
//       });
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
      !excelData["planned_DCGR"] ||
      !Array.isArray(excelData["planned_DCGR"])
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Excel format or missing sheet" });
    }

    const allRowsData = excelData["planned_DCGR"];

    if (allRowsData.length === 0) {
      return res.status(400).json({ error: "Excel file is empty" });
    }

    const columnToKey = {
      A: "deliveryPlant",
      B: "totalPoValue",
      C: "plannedDCGRPercentage",
      D: "threePLActualDCGRPercentage",
      E: "planned3PLInvoiceValue",
      F: "threePLInvoiceValue",
      G: "tslSavingIRS",
    };

    // Convert Excel data to JSON
    const jsonData = allRowsData.map((row) => {
      const jsonRow = {};
      Object.keys(columnToKey).forEach((col) => {
        if (columnToKey[col] === "threePLActualDCGRPercentage") {
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

    const plannedDcgrData = jsonData.map((el, index) => {
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
    const totalRecords = plannedDcgrData.length;

    for (const data of plannedDcgrData ) {
      try {
        const request = getSqlRequest();
        const yearMonthDate = moment(data.yearMonth, "MM-YYYY")
          .endOf("month")
          .toDate();

         // Check if the record already exists
        const result = await request
          .input("id", sql.NVarChar, data.id)
          .query("SELECT COUNT(*) AS count FROM tb_owm_3pldsb_planned_dcgr_value_vs_actual_Test WHERE id = @id");

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
          .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
          .input(
            "totalPoValue",
            sql.Decimal(18, 2),
            parseFloat(data.totalPoValue)
          )
          .input(
            "plannedDCGRPercentage",
            sql.Decimal(5, 2),
            parseFloat(data.plannedDCGRPercentage)
          )
          .input(
            "threePLActualDCGRPercentage",
            sql.Decimal(5, 2),
            parseFloat(data.threePLActualDCGRPercentage)
          )
          .input(
            "planned3PLInvoiceValue",
            sql.Decimal(18, 2),
            parseFloat(data.planned3PLInvoiceValue)
          )
          .input(
            "threePLInvoiceValue",
            sql.Decimal(18, 2),
            parseFloat(data.threePLInvoiceValue)
          )
          .input(
            "tslSavingIRS",
            sql.Decimal(18, 2),
            parseFloat(data.tslSavingIRS)
          )
          .input("createdBy", sql.NVarChar, data.createdBy).query(`
                        INSERT INTO tb_owm_3pldsb_planned_dcgr_value_vs_actual_Test(
                         id, customerID, yearMonth, deliveryPlant, totalPoValue, plannedDCGRPercentage,
                          threePLActualDCGRPercentage, planned3PLInvoiceValue, threePLInvoiceValue, tslSavingIRS ,createdDate, createdBy
                        ) VALUES (
                        @id, @customerID, @yearMonth, @deliveryPlant, @totalPoValue, @plannedDCGRPercentage,
                          @threePLActualDCGRPercentage, @planned3PLInvoiceValue, @threePLInvoiceValue, @tslSavingIRS, GETDATE(), @createdBy
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

// fetch Dashboard Cards Statistics By CustomerID

exports.fetchDashboardCardsStatisticsByCustomerID = async (req, res) => {
  const { customerID } = req.params;
  const { deliveryPlant } = req.query;

  // Ensure customerID is provided
  if (!customerID) {
    return res.status(400).send("customerID is required");
  }

  try {
    const request = getSqlRequest();

    // Add customerID as a parameter to the request
    request.input("customerID", sql.VarChar, customerID);

    // Build the dynamic WHERE clause based on the provided query parameters
    let whereClause = "WHERE customerID = @customerID";

    if (deliveryPlant) {
      whereClause += " AND deliveryPlant = @deliveryPlant";
      request.input("deliveryPlant", sql.VarChar, deliveryPlant);
    }

    // Define the SQL query using the parameter
    const result = await request.query(`
            SELECT
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
        `);

    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Something went wrong");
  }
};

// fetching Graph Statistics Of Planned DCGR By Customer

exports.fetchGraphStatisticsOfPlannedDCGRByCustomer = async (req, res) => {
  const { customerID } = req.params;
  const { deliveryPlant } = req.query;

  // Ensure customerID is provided
  if (!customerID) {
    return res.status(400).send("customerID is required");
  }

  try {
    const request = getSqlRequest();

    // Add customerID as a parameter to avoid SQL injection
    request.input("customerID", sql.NVarChar, customerID);

    // Build the dynamic WHERE clause based on the provided query parameters
    let whereClause = "WHERE customerID = @customerID";

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
         FOR JSON PATH) AS SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant
    `;

    // Execute the query and retrieve the result
    const result = await request.query(query);

    // Parse the result
    const SumOfTslSavingIRSByDeliveryPlant = JSON.parse(
      result.recordset[0].SumOfTslSavingIRSByDeliveryPlant
    );

    // Calculate the total of SumOfTslSavingIRS
    const totalSumOfTslSavingIRS = SumOfTslSavingIRSByDeliveryPlant.reduce((total, item) => total + item.SumOfTslSavingIRS, 0);

    const statistics = {
      SumOfTslSavingIRSByDeliveryPlant,
      TotalSumOfTslSavingIRS: totalSumOfTslSavingIRS,
      AveragePlannedAndActualDCGRPercentageByDeliveryPlant: JSON.parse(
        result.recordset[0].AveragePlannedAndActualDCGRPercentageByDeliveryPlant
      ),
      SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant: JSON.parse(
        result.recordset[0].SumOfPlannedAndActual3PLInvoiceValueByDeliveryPlant
      ),
    };

    res.json(statistics);
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};











