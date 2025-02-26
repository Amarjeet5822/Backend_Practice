const express = require("express");
const router = require("./middlewares/routerLevel");
const path = require("path");
const morgan = require('morgan');

const app = express();
// parse the req.body 
app.use(express.json());
// Use Morgan with a predefined format
app.use(morgan('dev'));
// create path join with main sequence of folder structure
app.set('views', path.join(__dirname, 'views'));
// we want to show page using ejs 
app.set("view engine", 'ejs')

//Router-level Middleware
app.use("/",router);

app.get("/users/:id", (req, res) => {
  console.log("req.params.id",`${req.params.id} ${typeof(req.params.id)}`);
  res.send(req.params.id);
})

app.listen(8080, () => {
  console.log("app running http://localhost:8080")
})

