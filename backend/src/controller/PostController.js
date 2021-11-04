const Post = require("../model/Post");
const Job = require("../model/Job")
const User = require("../model/User")
const imgur = require("imgur");
const PostController = {
  createPost: async function (req, res, next) {
    try {
      const { title, description, type, ownerId, first_name, last_name, imgOwner, status, job } = req.body;
      var img = null
      if(req.file){
        const url = await imgur.uploadFile(req.file.path);
        img = url.link;
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
          first_name,
          last_name,
          imgOwner,
          status,
          createDate,
          job,
          img,
        });
        const userNoti = await User.find({job})
        const filterUserNoti = userNoti.filter((user) => user._id != ownerId)
        filterUserNoti.map(async (item) => {
          const arrNotiPost = item.notiNewPost
          const notiPost = {
            _id: post._id,
            title: post.title,
            description: post.description,
            type: post.type,
            ownerId: post.ownerId,
            first_name: post.first_name,
            last_name: post.last_name,
            imgOwner: post.imgOwner,
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
