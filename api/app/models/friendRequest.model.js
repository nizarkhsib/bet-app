const mongoose = require("mongoose");

const FriendRequest = mongoose.model(
  "FriendRequest",
  new mongoose.Schema({
    from: String,
    to: String,
    status: String
  })
);

module.exports = FriendRequest;
