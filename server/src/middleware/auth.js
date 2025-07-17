const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
const userAuth = async (req, res, next) => {
        console.log("JWT_TOKEN from env:", process.env.JWT_TOKEN);
  
  try {
    const { token } = req.cookies;

    let decodedData = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await UserModel.findById(decodedData?._id);
    if (!user) {
      throw new Error("No User Found!");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Please login to continue. " + (err?.message || ""),
    });
  }
};
module.exports = { userAuth };
