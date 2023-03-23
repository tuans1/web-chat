const User = require("../models/User");
const statusCode = require("../exception/StatusCode");
const userException = require("../exception/UserException");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const UserException = require("../exception/UserException");
module.exports = {
  index: function (req, res) {
    const user = User.find({}, (err, result) => {
      res.status(statusCode.SUCCESS).json(result);
    });
  },
  login: async function (req, res) {
    const user = await User.findOne({ ldap: req.body.ldap }).then(
      (response) => {
        if (!response) {
          return res
            .status(statusCode.BAD_REQUEST)
            .json({ error: userException.USER_NOT_FOUND });
        }
        return response;
      }
    );
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: userException.USER_NOT_FOUND });
    }
    const token = jwt.sign({ id: user._id }, "leofromvn");
    return res.status(statusCode.SUCCESS).json({token});
  },
  private: function name(req, res) {
      res.send("Success");
  },
  register: async function (req, res) {
    const isExist = await User.collection
      .countDocuments({ email: req.body.email })
      .then((res) => res);
    if (isExist) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: "Email already Exist !" });
    }
    const hashedPassword = await bcrypt
      .hash(req.body.password, saltRounds)
      .then((hash) => hash);
    const formData = { ...req.body };
    formData.password = hashedPassword;
    User.create(formData, function (err, listUser) {
      console.log(listUser, "OK");
      if (err)
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .json({ error: "Create or get List after Create unsuccess!" });
      // saved!
    });
    res
      .status(statusCode.SUCCESS)
      .json({ message: "Create User Successfully" });
  },
};
