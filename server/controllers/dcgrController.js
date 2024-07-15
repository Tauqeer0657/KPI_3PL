const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");

//getting all data from dcgr table

exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest();

    const query = "SELECT * FROM tb_owm_3pldsb_dcgr_value_vs_actual_v1";
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).send({
        message: "No data found in the dcgr table.",
      });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// upload excel file to database

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
//       !excelData["DCGR Value Vs Actual 3Pl Cost "] ||
//       !Array.isArray(excelData["DCGR Value Vs Actual 3Pl Cost "])
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Invalid Excel format or missing sheet" });
//     }

//     const allRowsData = excelData["DCGR Value Vs Actual 3Pl Cost "];

//     if (allRowsData.length === 0) {
//       return res.status(400).json({ error: "Excel file is empty" });
//     }

//     const columnToKey = {
//       A: "deliveryPlant",
//       B: "sumOfInvoice",
//       C: "plannedDCGRValuePercentage",
//       D: "threePLInvoiceValuePercentage",
//       E: "plannedDCGRValueIRS",
//       F: "threePLInvoiceValue",
//     };

//     // Convert Excel data to JSON
//     const jsonData = allRowsData.map(row => {
//       const jsonRow = {};
//       Object.keys(columnToKey).forEach((col) => {
//         if (columnToKey[col] === "threePLInvoiceValuePercentage") {
//           // Multiply by 100 to convert it to percentage
//           jsonRow[columnToKey[col]] = row[col] ? row[col] * 100 : null;
//         } else {
//           // Check if row[col] is defined before calling toString()
//           jsonRow[columnToKey[col]] = row[col] !== undefined && row[col] !== null ? row[col].toString() : null;
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
//         const yearMonthDate = moment(data.yearMonth, "MM-YYYY").endOf('month').toDate();




//         await request
//           .input("customerID", sql.NVarChar, data.customerID)
//           .input("yearMonth", sql.DateTime, yearMonthDate)
//           .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
//           .input(
//             "sumOfInvoice",
//             sql.Decimal(18, 2),
//             parseFloat(data.sumOfInvoice)
//           )
//           .input(
//             "plannedDCGRValuePercentage",
//             sql.Decimal(5, 2),
//             parseFloat(data.plannedDCGRValuePercentage)
//           )
//           .input(
//             "threePLInvoiceValuePercentage",
//             sql.Decimal(5, 2),
//             parseFloat(data.threePLInvoiceValuePercentage)
//           )
//           .input(
//             "plannedDCGRValueIRS",
//             sql.Decimal(18, 2),
//             parseFloat(data.plannedDCGRValueIRS)
//           )
//           .input(
//             "threePLInvoiceValue",
//             sql.Decimal(18, 2),
//             parseFloat(data.threePLInvoiceValue)
//           )
//           .input("createdBy", sql.NVarChar, data.createdBy).query(`
//                       INSERT INTO tb_owm_3pldsb_dcgr_value_vs_actual_v1(
//                         customerID, yearMonth, deliveryPlant, sumOfInvoice, plannedDCGRValuePercentage,
//                         threePLInvoiceValuePercentage, plannedDCGRValueIRS, threePLInvoiceValue ,createdDate, createdBy
//                       ) VALUES (
//                         @customerID, @yearMonth, @deliveryPlant, @sumOfInvoice, @plannedDCGRValuePercentage,
//                         @threePLInvoiceValuePercentage, @plannedDCGRValueIRS, @threePLInvoiceValue, GETDATE(), @createdBy
//                       )
//                     `);
//         successCount++;
//       } catch (error) {
//         console.error("Error inserting data:", error);
//       }
//     }


//     console.log(`Total successful insertions: ${successCount}`);

//     if (successCount === gcgrData.length) {
//       res.status(200).json({ message: `All data inserted into the database  Count :  ${successCount}`, count: successCount });
//     } else {
//       res.status(500).json({ error: "Some data failed to insert into the database", count: successCount });
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
      !excelData["DCGR Value Vs Actual 3Pl Cost "] ||
      !Array.isArray(excelData["DCGR Value Vs Actual 3Pl Cost "])
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Excel format or missing sheet" });
    }

    const allRowsData = excelData["DCGR Value Vs Actual 3Pl Cost "];

    if (allRowsData.length === 0) {
      return res.status(400).json({ error: "Excel file is empty" });
    }

    const columnToKey = {
      A: "deliveryPlant",
      B: "sumOfInvoice",
      C: "plannedDCGRValuePercentage",
      D: "threePLInvoiceValuePercentage",
      E: "plannedDCGRValueIRS",
      F: "threePLInvoiceValue",
    };

    // Convert Excel data to JSON
    const jsonData = allRowsData.map(row => {
      const jsonRow = {};
      Object.keys(columnToKey).forEach((col) => {
        if (columnToKey[col] === "threePLInvoiceValuePercentage") {
          // Multiply by 100 to convert it to percentage
          jsonRow[columnToKey[col]] = row[col] ? row[col] * 100 : null;
        } else {
          // Check if row[col] is defined before calling toString()
          jsonRow[columnToKey[col]] = row[col] !== undefined && row[col] !== null ? row[col].toString() : null;
        }
      });
      return jsonRow;
    });

    const gcgrData = jsonData.map((el, index) => {
      return {
        ...el,
        // Generate ID based on year and month
        id: `${yearMonth}-${index + 1}`, // Example: 2024-05-1, 2024-05-2, etc.
        customerID: customerID,
        yearMonth: yearMonth,
        createdBy: createdBy,
      };
    });

    console.log(gcgrData)

    let successCount = 0;
    let duplicateCount = 0;
    const totalRecords = gcgrData.length;

    for (const data of gcgrData) {
      try {
        // Create a new request object for each query
        const request = getSqlRequest();
        const yearMonthDate = moment(data.yearMonth, "MM-YYYY").endOf('month').toDate();

        // Check if the record already exists
        const result = await request
          .input("id", sql.NVarChar, data.id)
          .query("SELECT COUNT(*) AS count FROM tb_owm_3pldsb_dcgr_value_vs_actual_Test WHERE id = @id");

        if (result.recordset[0].count > 0) {
          duplicateCount++;
          continue; // Skip inserting the duplicate record
        }

        // Create a new request object for the insert query
        const insertRequest = getSqlRequest();

        // Insert the new record
        await insertRequest
          .input("id", sql.NVarChar, data.id)
          .input("customerID", sql.NVarChar, data.customerID)
          .input("yearMonth", sql.DateTime, yearMonthDate)
          .input("deliveryPlant", sql.NVarChar, data.deliveryPlant)
          .input(
            "sumOfInvoice",
            sql.Decimal(18, 2),
            parseFloat(data.sumOfInvoice)
          )
          .input(
            "plannedDCGRValuePercentage",
            sql.Decimal(5, 2),
            parseFloat(data.plannedDCGRValuePercentage)
          )
          .input(
            "threePLInvoiceValuePercentage",
            sql.Decimal(5, 2),
            parseFloat(data.threePLInvoiceValuePercentage)
          )
          .input(
            "plannedDCGRValueIRS",
            sql.Decimal(18, 2),
            parseFloat(data.plannedDCGRValueIRS)
          )
          .input(
            "threePLInvoiceValue",
            sql.Decimal(18, 2),
            parseFloat(data.threePLInvoiceValue)
          )
          .input("createdBy", sql.NVarChar, data.createdBy).query(`
                      INSERT INTO tb_owm_3pldsb_dcgr_value_vs_actual_Test(
                        id, customerID, yearMonth, deliveryPlant, sumOfInvoice, plannedDCGRValuePercentage,
                        threePLInvoiceValuePercentage, plannedDCGRValueIRS, threePLInvoiceValue ,createdDate, createdBy
                      ) VALUES (
                        @id, @customerID, @yearMonth, @deliveryPlant, @sumOfInvoice, @plannedDCGRValuePercentage,
                        @threePLInvoiceValuePercentage, @plannedDCGRValueIRS, @threePLInvoiceValue, GETDATE(), @createdBy
                      )
                    `);
        successCount++;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }

    console.log(`Total records in file: ${totalRecords}`);
    console.log(`Total successful insertions: ${successCount}`);
    console.log(`Total duplicate records skipped: ${duplicateCount}`);

    res.status(200).json({
      message: `Data processing complete. Total records: ${totalRecords}, Successful insertions: ${successCount}, Duplicate records skipped: ${duplicateCount}`,
      totalRecords,
      successCount,
      duplicateCount
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};






