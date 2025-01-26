const express = require("express");
const { ProfileModel } = require("../models/profile.models")
const profileRouter = express.Router()

profileRouter.post("/", async (request, response) => {
  const {body } = request;
  const newProfile = new ProfileModel(body);
  await newProfile.save();
  response.status(201).send({"message": "New Profile added successfully", newProfile});
});

profileRouter.get("/", async (request, response) => {
  const profiles = await ProfileModel.find();
  response.status(200).send({"message": "fetched all the profile from db", profiles});
});
module.exports = {profileRouter};