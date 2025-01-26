const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
app.use(express.json());
// MongoDB connection URI
const mongoURI = "mongodb://127.0.0.1:27017/School"; 

const {studentsRouter} = require("./routes/students.router"); 
const {teachersRouter} = require('./routes/teachers.router');

// StudentsRouter is also working as custom middleware. If any req comes on students route. App will autometically called to studentsRouter.
app.use("/students", studentsRouter)
app.use("/teachers", teachersRouter)

app.listen(port, () => {
  // Connect to MongoDB
  mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>{
    console.log("Error in connecting",error)
  })
  console.log(`application is running http://localhost:${port}`)
})