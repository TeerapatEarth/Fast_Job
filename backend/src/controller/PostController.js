const Post = require("../model/Post");
const PostController = {
  createPost: async function (req, res, next) {
    try {
      const { title, description, type, ownerId, status } = req.body;
      var img = req.file.path
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
          img,
        });
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
          await Post.findByIdAndDelete(id)
          res.status(201).send("Delete post complete")
      } catch (err){
          console.log(err)
      }
  }
};

module.exports = PostController;
