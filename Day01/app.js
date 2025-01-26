const express = require('express')
const crypto = require('crypto');


app = express();

// app.use(JSON)
app.get('/', (req, res) => {
  return "Welcome"
});

console.log("It is running ?")
console.time("time check")
let sum=0;
for (let i=0;i<10001; i++ ) {
  sum += i
}
console.log(sum);
console.timeEnd("time check") // We need to always keep string same in time and in timeEnd.


