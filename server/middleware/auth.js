const jwt = require("jsonwebtoken");
const sql = require("mssql");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unaothorized - token is not provided" });
  }
  try {
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const query = `SELECT * FROM tb_owm_3pldsb_user_master_v1`;
    const request = new sql.Request();
    request.input("userID", sql.VarChar, verifyUser.userID);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res
        .status(401)
        .json({ error: "Unauthorized - User does not exist" });
    }

    req.authenticatedUser = result.recordset[0];
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("JWT Error:", error);
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {authenticateUser};