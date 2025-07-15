const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const profileRoute = express.Router();
profileRoute.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("Error while fetching the profile" + err.message);
  }
});

profileRoute.patch("/edit", userAuth, async (req, res) => {
  try {
    const { isValid, invalidField } = validateEditData(req.body);
    if (!isValid) {
      throw new Error(`Invalid Edit Request: ${invalidField} not editable`);
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: "User updated Successfully!",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
profileRoute.patch("/forgot-password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { password, newPassword } = req.body;
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    res.send("Password has changed successfully");
  } catch (err) {
    res.send("Error :" + err.message);
  }
});
module.exports = profileRoute;
