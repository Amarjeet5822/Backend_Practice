// Creation of Server using Express

const express = require("express")
const app = express();
const port = 8080;

app.get("/api/users", (req, res) => {
  res.json({ message: "Get all the users"});
});

app.post("/api/users", (req, res ) => {
  res.json({ message: "Create a new user"});
});

app.listen(port, () => {
  console.log(`This app is running at ${port}`)
})
