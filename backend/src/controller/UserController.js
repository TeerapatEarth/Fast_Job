const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserController = {
  regisUser: async function (req, res, next) {
    try {
      const { user_name, password, first_name, last_name, email } = req.body;
      if (!(user_name && password && first_name && last_name && email)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User already exist. Please login");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        user_name,
        password: encryptedPassword,
        first_name,
        last_name,
        email: email.toLowerCase(),
      });
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  },
  login: async function (req, res, next) {
    try {
      const { user_name, password } = req.body;
      if (!(user_name && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ user_name });

      if (user && (await bcrypt.compare(password, user.password))) {
        const sess = req.session;
        sess.user = user;
        res.status(200).send("Login " + user.user_name);
      } else {
        return res.status(400).send("Invalid username or password");
      }
    } catch (err) {
      console.log(err);
    }
  },
  logout: async function (req, res, next) {
    try {
      req.session.destroy();
      res.status(200).send("Logout");
    } catch (err) {
      console.log(err);
    }
  },
  getSession: async function (req, res, next) {
    let sess = req.session;
    if (!sess.user) {
      res.status(400).json({ status: "Please Login" });
    }
    res.status(200).send(sess.user);
  },
  getAllUser: async function (req, res, next) {
    try {
      const allUser = await User.find({});
      res.status(201).json(allUser);
    } catch (err) {
      console.log(err);
    }
  },
  getOneUser: async function (req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  },
  updateUser: async function (req, res, next) {
    try {
      const {id} = req.params
      const obj = req.body;
      const userUpdate = await User.findByIdAndUpdate(id, {
        user_name: obj.user_name,
        email: obj.email,
        first_name: obj.first_name,
        last_name: obj.last_name
      });
      res.status(201).json("Update user completed");
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async function (req, res, next) {
    try{
      const {id} = req.params
      await User.findByIdAndDelete(id)
      res.status(201).json("Delete user completed")
    } catch (err){
      console.log(err)
    }
  }
};

module.exports = UserController;
