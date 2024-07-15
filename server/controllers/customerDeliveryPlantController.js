const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");

//getting all Delivery Plant Based On Customer

exports.getAllDeliveryPlantBasedOnCustomer = async (req, res) => {
  const { customerID } = req.params;
  if (!customerID) {
    return res.status(400).send("Customer ID is required");
  }

  try {
    const request = getSqlRequest();
    const query = `
            SELECT deliveryPlantID 
            FROM tb_owm_3pldsb_customer_delivery_plant_Master_v1
            WHERE customerID = @customerID;
        `;
    request.input("customerID", sql.NVarChar, customerID);
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res
        .status(404)
        .send("No delivery plants found for the specified customer ID");
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Internal Server Error");
  }
};
