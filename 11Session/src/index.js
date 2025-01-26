
const express = require("express");
const { dbConnection } = require("./db");
const dotenv = require("dotenv");
const { userRouter } = require("../routes/users.route");
dotenv.config();
const app = express()
// don't forget to parse the request body
app.use(express.json());
app.use("/api", userRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  dbConnection();
  console.log(`app is running at http://localhost:${PORT}`)
})