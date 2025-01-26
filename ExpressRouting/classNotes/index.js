// Concept 2: Segregation of Routes Using Express.Router

const express = require("express" );
const {userRouter} = require('./userProfile');
const app = express();

app.use("/users" , userRouter);

app.listen(3000, () => {
  console.log("app is running at http://localhost:3000 port")
})
