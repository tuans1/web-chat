const express = require("express");
const app = express();
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });
// middleware that is specific to this router
// define the home page route
router.use((req, res, next) => {
  console.log("Time in ROOM: ", Date.now());
  next();
});

router.get("/test",(req,res)=>{
  
});
router.post("/create-message",MessageController.createMessage);

module.exports = router;
