const express = require("express");
const morgan = require('morgan');
const router = require("./routes/test");
const fs = require('fs');
const path = require('path');
const app = express();
// parse the req.body 
app.use(express.json());

// Using a predefined string:
app.use(morgan("tiny")); // [method, url, statusCode, content-length, response-time]

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// }))

// // EXAMPLE: only log error responses
// app.use(morgan('combined', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

// morgan.token('type', function (req, res) { return req.headers['content-type'] })

// // Use Morgan with a predefined format:
// app.use(morgan('dev'));  //logs ["methods", "url", "statusCode", and "response time" ] ( development use)

// app.use(morgan("combined")); // logs [::ffff:127.0.0.1 - - [26/Feb/2025:10:43:31 +0000] "GET / HTTP/1.1" 200 23 "-" "Thunder Client (https://www.thunderclient.com)" ]

// // Custom log formats using tokens:
// morgan.token('custom', (req, res) => {
//   return `Method: ${req.method}, URL: ${req.url}, Status: ${req.statusCode}`;
// })

// app.use(morgan(':custom'));
// const logStream = fs.createWriteStream(path.join(__dirname,'access.log'), {flags: 'a'});
// app.use(morgan('combined', {stream: logStream }));

// router for text.js file
app.use("/",router);

app.listen(8080, () => {
  console.log("app running http://localhost:8080")
})

