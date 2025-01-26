const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbUrl = process.env.DB_CONNECTION_URL;
const dbConnection =async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("db connected")
  } catch (error) {
    console.log(error)
  }

}

module.exports = {dbConnection};