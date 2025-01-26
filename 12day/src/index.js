const express = require("express");
const { connect } = require("../config/db");
const dotenv = require("dotenv");
const { userRouter } = require("../routes/user.router");
const { blogRouter } = require("../routes/blog.router");
dotenv.config()
const app = express();
app.use(express.json());

app.use("/users", userRouter)
app.use("/blogs", blogRouter)
// Private route 
app.get("/private-data", (request, response) => {
  response.send("Private data")
});

// Movie Route
app.get("/movies", (request, response) => {
  response.send("You're watching movie")
});

app.get("/health", (request, response) => {
  response.send("Health details")
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  connect()
  console.log(`app is running at http://localhost:${PORT}`)
})
