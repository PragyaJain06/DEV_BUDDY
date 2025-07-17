const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../model/user");
authRoute.get("/", (req, res) => {
  res.status(200).send("Server is healthy ✅");
});

authRoute.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body);
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user1 = new UserModel({
      ...req.body,
      password: hashPassword,
    });
    await user1.save();
    res.send("user saved successfully");
  } catch (err) {
    res.status(400).send(err.message, "error while creating a user");
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    let { email: userEmail, password } = req.body;
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      let token = await user.getJwt();
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // true in production
  sameSite: "None", // allow cross-site cookies
});

      res.json({
        message: "Login Successful!",
        data: user,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error while logging in " + err.message);
  }
});

authRoute.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User Logged out successfully!");
});

module.exports = authRoute;
