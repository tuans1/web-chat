const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Room = new Schema({
  name: String,
  backgroundImage: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  limitMember: String,
});

module.exports = mongoose.model("Room", Room);
