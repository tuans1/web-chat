const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Room = new Schema({
  name: String,
  backgroundImage: String,
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("Room", Room);
