const express = require("express");
const app = express();
const route = require("./src/routes/index");
const database = require("./src/config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });

// wss.on("connection", function connection(ws) {
//   console.log("A new client Connected!");
//   ws.send("Welcome New Client!");

//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
    
//     // wss.clients.forEach(function each(client) {
//     //   console.log(client);
//     //   if (client !== ws && client.readyState === WebSocket.OPEN) {
//     //     client.send(message);
//     //   }
//     // });
//   });
// });

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);
database.connect();

server.listen(5000);
