const Room = require("../models/Room");
const statusCode = require("../exception/StatusCode");
const UserException = require("../exception/UserException");
const { ObjectId } = require("bson");
module.exports = {
  getAllUserInRoom: async function name(req, res) {
    const room = await Room.findById({ _id: req.params.id }).populate("users");
    console.log(room);
    res.send("SUCESS");
    // res.status(statusCode.SUCCESS).send({ rooms: userRoomList.rooms });
  },
  getAllUserInRoom: async function name(req, res) {
    const room = await Room.findById({ _id: req.params.id }).populate("users");
    console.log(room);
    res.send("SUCESS");
    // res.status(statusCode.SUCCESS).send({ rooms: userRoomList.rooms });
  },
  createMessage: function name(req, res) {
    try {
      req.body.users = [req.body.user_id];
      const room = new Room(req.body);
      room.save();
      return res.sendStatus(statusCode.SUCCESS).json({ room });
    } catch (error) {}
  },
  addUserToRoom: async function name(req, res) {
    try {
      //findOneAndUpdate() đang thực thực thi thì mọi yêu cầu vào db được khóa lại trong suốt quá trình này diễn ra
      await Room.findOneAndUpdate(
        { _id: req.body.id },
        // { $each: [...] }
        { $push: { users: req.body.usersId } }, //$addToSet : operator to add a new item to an array only if it doesn't already exist in the array
        { new: true } // tells Mongoose to return the updated document.
      );
      return res.status(statusCode.SUCCESS).send("Success");
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
