// const bodyParser = require('body-parser');
// const express = require('express');
// const cookieParser = require("cookie-parser");
// const cookieValidator = require("./middlewares/cookieValidator");

// const app = express(); // initialization of app



// // It parses incoming requests with JSON payloads.
// app.use(express.json()); 

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());

// // parse application/jons
// app.use(bodyParser.json());

// const validateCookies = async (req, res, next) => {
//   await cookieValidator(req.cookies)
//   next()
// }
// app.use(cookieParser());
// app.use(validateCookies)


// app.post("/login", (req, res) => {
//   if(!req.body || !req.body.username ) res.sendStatus(400)
//    res.send("Welcome, " + req.body.username)
// })

// // const myLogger = (req, res, next ) => {
// //   console.log("LOGGED");
// //   next()
// // }
// // const requestTime = (req, res, next) => {
// //   req.requestTime = Date.now();
// //   next()
// // }
// // app.use(myLogger, requestTime);

// // app.get("/", (req, res) => {

// //   res.send(`Hello Jii!<br> <small> Requested at: ${req.requestTime} </small>`);
// // })

// //error handler 
// app.use((err, req, res, next) => {
//   res.status(400).send(err.message);
// })
// const PORT = 8080
// app.listen(PORT, () => {
//   console.log("app running http://localhost:8080")
// });
