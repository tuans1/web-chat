const express = require("express");
const router = express.Router();

// middleware that is specific to this router
// define the home page route
router.use((req, res, next) => {
  console.log("Time in Product: ", Date.now());
  next();
});
router.get("/", (req, res) => {
    res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
    res.send("About birds");
});

module.exports = router;
