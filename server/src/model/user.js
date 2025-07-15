const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(values) {
        if (!validator.isEmail(values)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(values) {
        if (!validator.isStrongPassword(values)) {
          throw new Error("Please enter strong password");
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
      validate(values) {
        if (!["male", "female", "others"].includes(values)) {
          throw new Error("Please specify valid gender");
        }
      },
    },
    age: {
      type: Number,
    },
    photoUrl: {
      type: String,
      validate(values) {
        if (!validator.isURL(values)) {
          throw new Error("Invalid photo url");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about section of the user",
    },
    skill: {
      type: [String],
    },
  },
  { timestamps: true }
);
UserSchema.index({ firstName: 1, lastName: 1 });
UserSchema.methods.getJwt = async function () {
  const user = this;
  let token = jwt.sign({ _id: user.id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  return token;
};
UserSchema.methods.validatePassword = async function (inputPasswordByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    inputPasswordByUser,
    user.password
  );
  return isPasswordValid;
};
const UserModel = mongoose.model("User of Namaste Dev", UserSchema);

module.exports = UserModel;
