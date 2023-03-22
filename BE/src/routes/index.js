const express = require("express");
const app = express();
const product = require("./product");
const user = require("./user");
app.use("/", product);
app.use("/user", user);

module.exports = app;
