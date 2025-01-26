const express = require("express");
const cors = require("cors")
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

const {studentsRouter} = require("./routes/students.router"); 
const {teachersRouter} = require('./routes/teachers.router');

// StudentsRouter is also working as custom middleware. If any req comes on students route. App will autometically called to studentsRouter.
app.use("/students", studentsRouter)
app.use("/teachers", teachersRouter)

app.listen(port, () => {
  console.log(`application is running http://localhost:${port}`)
})