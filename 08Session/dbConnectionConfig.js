const mongoose = require("mongoose");

const mongooseConnection = mongoose.connect("mongodb://127.0.0.1:27017/learnMongoose")

module.exports = { mongooseConnection};