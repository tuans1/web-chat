const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const validator = require("validator");
const User = new Schema({
  ldap: String,
  name: String,
  password: String,
  email: {
    type: String,
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  avatar: String,
  role: { type: String, default: "user" },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("User", User);
