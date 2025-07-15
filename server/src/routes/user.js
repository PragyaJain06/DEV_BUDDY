const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const UserModel = require("../model/user");

const userRoute = express.Router();
const USER_INFO = [
  "firstName",
  "lastName",
  "about",
  "photoUrl",
  "age",
  "gender",
  "skill",
];
userRoute.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const connectionRequest = await ConnectionRequest.find({
      toUser: loggedInUser,
      status: "interested",
    }).populate("fromUser", USER_INFO);
    if (!connectionRequest) {
      return res.status(400).json({
        message: "No requests found",
      });
    } else if (connectionRequest?.length === 0) {
      return res.status(200).json({
        message: "No pending request",
      });
    }
    return res.json({
      message: "here are your pending requests",
      data: connectionRequest,
    });
  } catch (err) {
    res.send("ERROR:" + err.message);
  }
});

userRoute.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user?._id;
    const data = await ConnectionRequest.find({
      $or: [
        { toUser: loggedInUser, status: "accepted" },
        { fromUser: loggedInUser, status: "accepted" },
      ],
    })
      .populate("toUser", USER_INFO)
      .populate("fromUser", USER_INFO);
    const modifiedData = data?.map((item) => {
      if (item?.toUser?._id.toString() === loggedInUser?.toString()) {
        return item?.fromUser;
      }
      return item?.toUser;
    });
    res.json({
      message: "Here are your connections",
      data: modifiedData,
    });
  } catch (err) {
    res.send("ERROR: ", err.message);
  }
});
userRoute.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user?._id;
    const page = parseInt(req?.query?.p) || 1;
    let limit = parseInt(req?.query?.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUser: loggedInUser }, { toUser: loggedInUser }],
    }).select("fromUser toUser");
    console.log(connections);
    const hideUser = new Set();
    connections.forEach((item) => {
      hideUser.add(item?.fromUser.toString());
      hideUser.add(item?.toUser.toString());
    });
    const feed = await UserModel.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: loggedInUser } },
      ],
    })
      .select(USER_INFO)
      .skip(skip)
      .limit(limit);
    return res.json({
      message: "Your feed looks like:",
      data: feed,
    });
  } catch (err) {
    res.send("ERROR:", err.message);
  }
});
module.exports = userRoute;
