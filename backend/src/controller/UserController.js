const User = require("../model/User");
const Job = require("../model/Job");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const imgur = require("imgur");
const UserController = {
  regisUser: async function (req, res, next) {
    try {
      const {
        user_name,
        password,
        first_name,
        last_name,
        email,
        dateOfBirth,
        job,
      } = req.body;
      var img = null;
      if (req.file) {
        const url = await imgur.uploadFile(req.file.path);
        img = url.link;
      }
      if (
        !(
          user_name &&
          password &&
          first_name &&
          last_name &&
          email &&
          dateOfBirth &&
          job
        )
      ) {
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
        dateOfBirth,
        job,
        img,
      });
      const addUserToJob = await Job.findOne({ job });
      const arrUser = addUserToJob.user;
      arrUser.push(mongoose.Types.ObjectId(user._id));
      await Job.findByIdAndUpdate(addUserToJob._id, { user: arrUser });
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
      const { id } = req.params;
      const obj = req.body;
      const oldInfo = await User.findById(id);
      var img = oldInfo.img;
      if (req.file) {
        const url = await imgur.uploadFile(req.file.path);
        img = url.link;
      }
      if (oldInfo.job !== obj.job) {
        const objJob = await Job.findOne({ job: oldInfo.job });
        const arrUser = objJob.user;
        const indexDelete = arrUser.indexOf(id);
        arrUser.splice(indexDelete, 1);
        await Job.findByIdAndUpdate(objJob.id, { user: arrUser });
        const newObjJob = await Job.findOne({ job: obj.job });
        const newArrUser = newObjJob.user;
        newArrUser.push(oldInfo._id);
        await Job.findByIdAndUpdate(newObjJob.id, { user: newArrUser });
      }
      if (obj.password !== "") {
        encryptedPassword = await bcrypt.hash(obj.password, 10);
         await User.findByIdAndUpdate(id, {
          user_name: obj.user_name,
          email: obj.email,
          first_name: obj.first_name,
          last_name: obj.last_name,
          password: encryptedPassword,
          job: obj.job,
          img: img,
        });
      } else {
        await User.findByIdAndUpdate(id, {
          user_name: obj.user_name,
          email: obj.email,
          first_name: obj.first_name,
          last_name: obj.last_name,
          job: obj.job,
          img: img,
        });
      }
      res.status(201).json("Update user completed");
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async function (req, res, next) {
    try {
      const { id } = req.params;
      const deleteUser = await User.findById(id);
      const userJob = deleteUser.job;
      const objJob = await Job.findOne({ job: userJob });
      const arrUser = objJob.user;
      const indexDelete = arrUser.indexOf(id);
      arrUser.splice(indexDelete, 1);
      await Job.findByIdAndUpdate(objJob._id, { user: arrUser });
      await User.findByIdAndDelete(id);
      res.status(201).json("Delete user completed");
    } catch (err) {
      console.log(err);
    }
  },
  report: async function (req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      await User.findByIdAndUpdate(id, { reportCount: user.reportCount + 1 });
      res.status(201).send("Report user completed");
    } catch (err) {
      console.log(err);
    }
  },
  banUser: async function (req, res, next) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { ban: true });
      res.status(201).send("Banned user");
    } catch (err) {
      console.log(err);
    }
  },
  unBanUser: async function (req, res, next) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { ban: false });
      res.status(201).send("Un Banned user");
    } catch (err) {
      console.log(err);
    }
  },
  seeNotiPost: async function (req, res, next){
    try {
      const { id } = req.params;
      const user = await User.findById(id)
      const arrNoti = user.notiNewPost
      arrNoti.map((item) => item.seeByUser = true)
      await User.findByIdAndUpdate(id, {notiNewPost: arrNoti})
      res.status(201).send("User see notify")
    } catch (err){
      console.log(err)
    }
  }
};

module.exports = UserController;
