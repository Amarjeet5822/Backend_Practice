const express = require("express");
const crypto = require("crypto");
const { UserModel } = require("../models/user.models")
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
// add a new user
userRouter.post("/", async (request, response) => {
  const {body } = request;
  const token = jwt.sign({...body, token});
  const newUser = new UserModel({...body,password:hashPassword(body.password), token});
  await newUser.save()
  response.status(201).send({"message": "New user added successfully", newUser})
})

userRouter.get("/", async (request, response) => {
  const users = await UserModel.find()
  response.status(200).send({"message": "fetched all the users from db", users})
})
module.exports = {userRouter}