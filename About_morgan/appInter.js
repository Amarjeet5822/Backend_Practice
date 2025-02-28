const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const app = express();

// Create a rotating write stream
const accessLogStream = rfs.writeStream('access.log', {
  interval: '1d', // rotate da')
});

// Setup morgan to use 'combined' format and log to file
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});