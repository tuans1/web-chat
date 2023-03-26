const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");
// middleware that is specific to this router
// define the home page route
router.use((req, res, next) => {
  console.log("Time in ROOM: ", Date.now());
  next();
});
router.get("/get-all-user-in-room/:id",RoomController.getAllUserInRoom);
router.post("/create-room",RoomController.createRoom);
router.post("/add-user-to-room",RoomController.addUserToRoom);

module.exports = router;
