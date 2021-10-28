const Post = require("../model/Post");
const Job = require("../model/Job")
const User = require("../model/User")
const PostController = {
  createPost: async function (req, res, next) {
    try {
      const { title, description, type, ownerId, status, job } = req.body;
      var img = null
      if(req.file){
        img = req.file.path
      }
      const createDate = new Date()
      if (!(title && type)) { 
        res.status(400).send("Title and type is required");
      } else {
        const post = await Post.create({
          title,
          description,
          type,
          ownerId,
          status,
          createDate,
          job,
          img,
        });
        const userNoti = await User.find({job})
        userNoti.map(async (item) => {
          const arrNotiPost = item.notiNewPost
          const notiPost = {
            title: post.title,
            description: post.description,
            type: post.type,
            ownerId: post.ownerId,
            status: post.status,
            createDate: post.createDate,
            job: post.job,
            img: post.img,
            seeByUser: false
          }
          arrNotiPost.push(notiPost)
          await User.findByIdAndUpdate(item._id, {notiNewPost: arrNotiPost})
        })
        res.status(201).json(post);
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllPost: async function (req, res, next) {
    try {
      const allPost = await Post.find({});
      res.status(201).json(allPost);
    } catch (err) {
      console.log(err);
    }
  },
  getOnePost: async function (req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      res.status(201).json(post);
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: async function (req, res, next){
      try {
          const { id } = req.params
          const obj = req.body
          await Post.findByIdAndUpdate(id, {
              title: obj.title,
              description: obj.description,
              type: obj.type,
          })
          res.status(201).send("Update post completed")
      } catch (err){
          console.log(err)
      }
  },
  deletePost: async function (req, res, next){
      try{
          const { id } = req.params
          const post = await Post.findById(id)
          const deletePostInArrUserNoti = await User.find({job: post.job})
          deletePostInArrUserNoti.map(async (user) => {
            const newArr = user.notiNewPost.filter((post) => post._id != id)
            await User.findByIdAndUpdate(user._id, {notiNewPost: newArr})
          })
          await Post.findByIdAndDelete(id)
          res.status(201).send("Delete post complete")
      } catch (err){
          console.log(err)
      }
  }
};

module.exports = PostController;
