const express = require("express" )
const {dbConnection } = require("./dbConfig");

const { userRouter } = require("../routes/user.route");
const { orderRouter } = require("../routes/order.route");
const { profileRouter } = require("../routes/profile.route")

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/profiles", profileRouter)
app.use("/api/orders", orderRouter)

app.listen(PORT, () => {
  dbConnection()
  console.log(`app running at http://localhost:${PORT}`)
});

