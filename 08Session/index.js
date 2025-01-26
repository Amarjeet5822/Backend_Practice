const express = require("express");
const { mongooseConnection} = require('./dbConnectionConfig')
const { userRoutes } = require("./routes/user.route")
const app = express();
app.use(express.json());

// user Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send({"message": "Your are at home page"})
})

app.listen(8080, async () => {
  try{
    await mongooseConnection
    console.log("db is connect")
    console.log("app running at http://localhost:8080");
  } catch(error){
    console.log("error in connecting Db", error)
  }
  
})