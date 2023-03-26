const express = require("express");
const app = express();
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });
// middleware that is specific to this router
// define the home page route
wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    
    // wss.clients.forEach(function each(client) {
    //   console.log(client);
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });
});
router.use((req, res, next) => {
  console.log("Time in ROOM: ", Date.now());
  next();
});
router.get("/test",(req,res)=>{
  
});
router.post("/create-message",MessageController.createMessage);

module.exports = router;
