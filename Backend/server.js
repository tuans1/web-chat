const express = require("express");
const app = express();
const route = require("./src/routes/index");
const database = require("./src/config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
database.connect();
// global._io = io; // cach 2
// global._io.on("connection", SocketServices.connection);
server.listen(5000, () => {
  console.log("listening on *:5000");
});
