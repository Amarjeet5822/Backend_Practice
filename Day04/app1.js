// Application-level middleware

const express = require("express");
const app = express();

app.use((req, res, next ) => {
  console.log("Time:", Date.now());
  next()
}) 
app.use("/users/:id", (req, res, next ) => {
  console.log('Request Type', req.method );
  next();
}, (req, res, next) => {
  console.log("Request URL: ", req.originalUrl);
  next();
})
app.get("/users/:id", (req, res) => {
  console.log("req.params.id",`${req.params.id} ${typeof(req.params.id)}`);
  res.send(req.params.id);
})

app.listen(8080, () => {
  console.log("app running http://localhost:8080")
})