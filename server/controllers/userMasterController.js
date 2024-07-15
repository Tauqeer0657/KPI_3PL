const { getSqlRequest } = require("../utils/dbUtils");
const { sql } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Getting all users from user master table
exports.getAllData = async (req, res) => {
  try {
    const request = getSqlRequest();
    const query = `SELECT * FROM tb_owm_3pldsb_user_master_v1`;
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json("No data found in the user master table");
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json("Internal server error");
  }
};

// Adding User on user master table
exports.addUser = async (req, res) => {
  try {
    const request = getSqlRequest();
    request.input("customerID", sql.VarChar, req.body.customerID);
    request.input("userName", sql.VarChar, req.body.userName);
    request.input("userTypeID", sql.VarChar, req.body.userTypeID);
    request.input("userID", sql.VarChar, req.body.userID);
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    request.input("userPassword", sql.VarChar, hashedPassword);
    request.input("isActive", sql.Int, req.body.isActive);
    request.input("createdBy", sql.VarChar, req.body.createdBy);
    request.input("createdDate", sql.Date, req.body.createdDate);

    const query = `
      INSERT INTO tb_owm_3pldsb_user_master_v1
      (customerID, userName, userTypeID, userID, userPassword, isActive, createdBy, createdDate)
      VALUES (@customerID, @userName, @userTypeID, @userID, @userPassword, @isActive, @createdBy, @createdDate)`;

    await request.query(query);
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  const userId = req.params.userID;
  const updatedUserDetails = req.body;

  const fieldTypeMap = {
    customerID: sql.VarChar,
    userName: sql.VarChar,
    userTypeID: sql.VarChar,
    userID: sql.VarChar,
    userPassword: sql.VarChar,
    isActive: sql.Int,
    createdBy: sql.VarChar,
    createdDate: sql.DateTime,
  };

  let setClause = [];
  let parameters = {};

  if (updatedUserDetails.customerID) {
    setClause.push("customerID = @customerID");
    parameters["customerID"] = updatedUserDetails.customerID;
  }
  if (updatedUserDetails.userName) {
    setClause.push("userName = @userName");
    parameters["userName"] = updatedUserDetails.userName;
  }
  if (updatedUserDetails.userTypeID) {
    setClause.push("userTypeID = @userTypeID");
    parameters["userTypeID"] = updatedUserDetails.userTypeID;
  }
  if (updatedUserDetails.userID) {
    setClause.push("userID = @userID");
    parameters["userID"] = updatedUserDetails.userID;
  }
  if (updatedUserDetails.userPassword) {
    const hashedPassword = await bcrypt.hash(updatedUserDetails.userPassword, 10);
    setClause.push("userPassword = @userPassword");
    parameters["userPassword"] = hashedPassword;
  }
  if (updatedUserDetails.isActive !== undefined) {
    setClause.push("isActive = @isActive");
    parameters["isActive"] = updatedUserDetails.isActive;
  }
  if (updatedUserDetails.createdBy) {
    setClause.push("createdBy = @createdBy");
    parameters["createdBy"] = updatedUserDetails.createdBy;
  }
  if (updatedUserDetails.createdDate) {
    setClause.push("createdDate = @createdDate");
    parameters["createdDate"] = updatedUserDetails.createdDate;
  }

  if (setClause.length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  const updateQuery = `
    UPDATE tb_owm_3pldsb_user_master_v1
    SET ${setClause.join(", ")}
    WHERE userID = @userID
  `;

  try {
    const request = getSqlRequest();
    request.input("userID", sql.VarChar, userId);

    for (const [key, value] of Object.entries(parameters)) {
      const dataType = fieldTypeMap[key] || sql.VarChar;
      request.input(key, dataType, value);
    }

    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User details updated successfully" });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login for users
exports.loginUser = async (req, res) => {
  const { userID, userPassword } = req.body;

  const query = `
    SELECT * FROM tb_owm_3pldsb_user_master_v1 
    WHERE userID = @userID
  `;

  try {
    const request = getSqlRequest();
    request.input("userID", sql.VarChar, userID);

    const results = await request.query(query);

    if (results.recordset.length > 0) {
      const user = results.recordset[0];

      const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user.userID,
            customerID: user.customerID,
            userTypeID: user.userTypeID,
          },
          process.env.SECRET_KEY || "SECRET_KEY",
          { expiresIn: "1h" }
        );
        res.cookie("token", token);

        res.json({
          message: "Login successful",
          user: {
            userID: user.userID,
            userName: user.userName,
            userTypeID: user.userTypeID,
            customerID: user.customerID,
            isActive: user.isActive,
          },
          token,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
