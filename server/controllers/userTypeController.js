const { getSqlRequest } = require("../utils/dbUtils")

// getting all data from user type table

exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest(); 
    const query = `SELECT * FROM tb_owm_3pldsb_user_type_v1`;
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json("No data found in the user type table");
    }
  } catch (err) {
    console.error("Sql error :", err);
    res.status(500).json("Internal server error");
  }
};
