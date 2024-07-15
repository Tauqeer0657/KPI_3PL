const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");

//getting all data of customers

exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest();

    const query = "SELECT * FROM tb_owm_3pldsb_customer_master_v1";
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).send({
        message: "No data found in the customer table.",
      });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Add new customer

exports.addCustomer = async (req, res) => {
  try {
    // Execute SQL query to insert new customer
    const request = getSqlRequest();
    request.input("customerID", sql.NVarChar, req.body.customerID);
    request.input("customerName", sql.NVarChar, req.body.customerName);
    request.input("customerAddress", sql.NVarChar, req.body.customerAddress);
    request.input("customerEmail", sql.NVarChar, req.body.customerEmail);
    request.input("isActive", sql.Int, req.body.isActive);
    request.input("createdDate", sql.Date, req.body.createdDate);
    request.input("createdBy", sql.NVarChar, req.body.createdBy);

    const query = `
      INSERT INTO tb_owm_3pldsb_customer_master_v1
      (customerID, customerName, customerAddress, customerEmail, isActive, createdDate, createdBy)
      VALUES (@customerID, @customerName, @customerAddress, @customerEmail, @isActive, @createdDate, @createdBy);
    `;

    await request.query(query);
    res.status(200).json({ message: "Customer added successfully" });
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ error: err.message });
  }
};
