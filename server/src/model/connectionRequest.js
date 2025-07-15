const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User of Namaste Dev",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User of Namaste Dev",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "accepted", "rejected", "interested"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUser: 1, toUser: 1 });
connectionRequestSchema.pre("save", function (next) {
  let connection = this;
  if (connection.fromUser.equals(connection.toUser)) {
    throw new Error("Can't send connection request to yourself!");
  }
  next();
});
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
