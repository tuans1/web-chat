const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const jwt = require("jsonwebtoken");
const statusCode = require("../exception/StatusCode");
const UserException = require("../exception/UserException");
// middleware that is specific to this router
// define the home page route
router.post("/login", UserController.login);
// router.use(checkAuth); // middleware
router.get("/auth", (req, res) => {
  return res.send("Good");
});
router.get("/dashboard", (req, res) => {
  return res.send("Good");
});
router.get("/", UserController.index);
router.get("/user-rooms/:id", UserController.getAllRoomByUser);
router.post("/register", UserController.register);
function checkAuth(req, res, next) {
  console.log("check Auth")
  const { token } = req.cookies;
  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).json(UserException.UNAUTHORIZED);
  }
  try {
    jwt.verify(token, "leofromvn");
    // req.valid = true; // pass valid to req for other func can check
    next(); // next function and comeback and execute again so return if not needed
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json(UserException.UNAUTHORIZED);
  }
}
module.exports = router;
