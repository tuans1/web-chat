const express = require("express");
const app = express();
const product = require("./product");
const room = require("./room");
const message = require("./message");
const user = require("./user");
app.use("/api/room", room);
app.use("/api/user", user);
app.use("/api/message", message);

module.exports = app;
