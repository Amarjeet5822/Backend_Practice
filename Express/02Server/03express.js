const express = require("express")

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send(" Hello World!")
} )
app.get("/about", (req, res) => {
  res.send(" This the the About page")
} )
app.get("/contact", (req, res) => {
  res.send(" Contact Page")
} )
app.get("/products", (req, res) => {
  res.send(" Products Page")
} )

app.listen(port, () => {
  console.log(`This express app is running at ${port}.`)
})