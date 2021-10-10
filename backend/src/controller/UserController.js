const User = require("../model/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserController = {
  regisUser: async function (req, res, next) {
    try {
      //Get user input
      const { user_name, password, first_name, last_name, email } = req.body;
      //Validate user input
      if (!(user_name && password && first_name && last_name && email)) {
        res.status(400).send("All input is required");
      }
      //check if user already exist
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User already exist. Please login");
      }
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        user_name,
        password: encryptedPassword,
        first_name,
        last_name,
        email: email.toLowerCase(),
      });
      //Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //save user token
      user.token = token;
      //return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = UserController;
