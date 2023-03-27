const express = require("express");
const app = express();
const route = require("./src/routes/index");
const database = require("./src/config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const SocketServices = require("./src/services/SocketService");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);
database.connect();
global._io = io; // cach 2
global._io.on("connection", SocketServices.connection);
app.listen(5000);
