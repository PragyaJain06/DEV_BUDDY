const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const UserModel = require("../model/user");
const requestRouter = express.Router();
requestRouter.post("/:status/:toUser", userAuth, async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.toUser;
    const status = req.params.status;
    const validStatus = ["interested", "ignored"].includes(status);
    if (!validStatus) {
      return res.status(400).json({
        message: "Invalid Status type:" + status,
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser },
      ],
    });
    const presentToUser = await UserModel.findById(toUser);
    if (!presentToUser) {
      return res.status(400).json({
        message: "Invalid Connection request, as this user doesn't exist",
      });
    }
    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection already exist",
      });
    }
    const user1 = new ConnectionRequest({
      fromUser,
      toUser,
      status,
    });

    const data = await user1.save();
    res.json({
      message: `${req?.user?.firstName + " " + req?.user?.lastName} ${
        status === "interested" ? "is interested in" : "ignored"
      } ${presentToUser?.firstName + " " + presentToUser?.lastName}`,
      data,
    });
  } catch (err) {
    res.send("Error:" + err.message);
  }
});
requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const status = req.params.status;
    const requestId = req.params.requestId;
    const loggedInUser = req.user._id;
    if (!["accepted", "rejected"].includes(status)) {
      return res.json({
        message: `Invalid status request: ${status}`,
      });
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUser: loggedInUser,
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(400).json({
        message: "Invalid connection request",
      });
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
      message: `The request is ${status}`,
      data,
    });
  } catch (err) {
    res.send("Error:" + err.message);
  }
});
module.exports = requestRouter;
