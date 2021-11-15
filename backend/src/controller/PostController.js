const Post = require("../model/Post");
const Job = require("../model/Job");
const User = require("../model/User");
const imgur = require("imgur");
const PostController = {
  createPost: async function (req, res, next) {
    try {
      const {
        title,
        description,
        type,
        ownerId,
        first_name,
        last_name,
        imgOwner,
        status,
        job,
      } = req.body;
      var img = null;
      if (req.file) {
        const url = await imgur.uploadFile(req.file.path);
        img = url.link;
      }
      const createDate = new Date().toLocaleDateString();
      const createTime = new Date().toTimeString().substring(0, 9);
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
          createTime,
          job,
          img,
        });
        const userNoti = await User.find({ job });
        const filterUserNoti = userNoti.filter((user) => user._id != ownerId);
        filterUserNoti.map(async (item) => {
          const arrNotiPost = item.notiNewPost;
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
            createTime: post.createTime,
            job: post.job,
            img: post.img,
            requestUser: [],
            seeByUser: false,
          };
          arrNotiPost.push(notiPost);
          await User.findByIdAndUpdate(item._id, { notiNewPost: arrNotiPost });
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
  updatePost: async function (req, res, next) {
    try {
      const { id } = req.params;
      const obj = req.body;
      var img = obj.myImage;
      var job = obj.job;
      if (req.file) {
        const url = await imgur.uploadFile(req.file.path);
        img = url.link;
      }
      await Post.findByIdAndUpdate(id, {
        title: obj.title,
        description: obj.description,
        type: obj.type,
        job: obj.job,
        img: img,
      });
      const userNoti = await User.find({ job });
      const post = await Post.findById(id)
      const filterUserNoti = userNoti.filter(
        (user) => user._id != post.ownerId
      );
      filterUserNoti.map(async (item) => {
        const deleteIdx = item.notiNewPost.findIndex(
          (postItem) => postItem._id === post._id
        );
        const newNotiArr = item.notiNewPost.splice(deleteIdx, 1);
        newNotiArr.push({
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
          createTime: post.createTime,
          job: post.job,
          img: post.img,
          requestUser: [],
          seeByUser: false,
        });
        await User.findByIdAndUpdate(item._id, { notiNewPost: newNotiArr });
      });
      res.status(201).send("Update post completed");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async function (req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      const deletePostInArrUserNoti = await User.find({ job: post.job });
      deletePostInArrUserNoti.map(async (user) => {
        const newArr = user.notiNewPost.filter((post) => post._id != id);
        await User.findByIdAndUpdate(user._id, { notiNewPost: newArr });
      });
      await Post.findByIdAndDelete(id);
      res.status(201).send("Delete post complete");
    } catch (err) {
      console.log(err);
    }
  },
  searchPost: async function (req, res, next){
    try{
      const {search} = req.params
      const post = await Post.find({title: { $regex: '.*' + search + '.*', $options: 'i' }})
      res.status(201).json(post)
    } catch (err){
      console.log(err)
    }
  },
  addUser: async function (req, res, next){
    try{
      const { id } = req.params
      const obj = req.body
      const post = await Post.findById(id)
      const arrRequestUser = post.requestUser
      arrRequestUser.push(obj)
      await Post.findByIdAndUpdate(id, {requestUser: arrRequestUser})
      const userNoti = await User.find({ job: obj.job })
      userNoti.map(async (item) => {
        const newArr = item.notiNewPost
        for(var i = 0 ; i < newArr.length ; i ++){
          if(newArr[i]._id == id){
            newArr[i].requestUser.push(obj)
            break;
          }
        }
        await User.findByIdAndUpdate(item._id, {notiNewPost: newArr})
      })
      res.status(201).send("Add user complete")
    } catch(err){
      console.log(err)
    }
  },
  cancleUser: async function (req, res, next){
    try{
      const { id } = req.params
      const obj = req.body
      const post = await Post.findById(id)
      const arrReauest = post.requestUser
      for (var i = 0 ; i < arrReauest.length ; i++){
        if(arrReauest[i]._id == obj._id){
          arrReauest.splice(i, 1)
          break;
        }
      }
      await Post.findByIdAndUpdate(id, {requestUser: arrReauest})
      const userNoti = await User.find({job: obj.job})
      userNoti.map(async (item) => {
        const newArr = item.notiNewPost
        for(var i = 0 ; i < newArr.length ; i ++){
          if(newArr[i]._id == id){
            for(var j = 0 ; j < newArr[i].requestUser.length; j++){
              if(newArr[i].requestUser[j]._id == obj._id){
                newArr[i].requestUser.splice(j, 1)
                break;
              }
            }
            break;
          }
        }
        await User.findByIdAndUpdate(item._id, {notiNewPost: newArr})
      })
      res.status(201).send("Cancle user complete")
    } catch (err){
      console.log(err)
    }
  },
  applyUser : async function (req, res, next){
    try{
      const { id } = req.params
      const obj = req.body
      const post = await Post.findById(id)
      const arrRequest = post.requestUser
      for(var i = 0 ; i < arrRequest.length ; i ++){
        if(arrRequest[i]._id == obj._id){
          arrRequest[i].status = true
          break;
        }
      }
      await Post.findByIdAndUpdate(id, {requestUser: arrRequest})
      const newPost = await Post.findById(id)
      const userNoti = await User.find({job: obj.job})
      userNoti.map(async (item) => {
        const newArr = item.notiNewPost
        for(var i = 0 ; i < newArr.length ; i ++){
          if(newArr[i]._id == id){
            for(var j = 0 ; j < newArr[i].requestUser.length; j++){
              if(newArr[i].requestUser[j]._id == obj._id){
                newArr[i].requestUser[j].status = true
                break;
              }
            }
            break;
          }
        }
        const newArrJob = item.notiJob
        newArrJob.push({
          _id: newPost._id,
          title: newPost.title,
          description: newPost.description,
          type: newPost.type,
          ownerId: newPost.ownerId,
          first_name: newPost.first_name,
          last_name: newPost.last_name,
          imgOwner: newPost.imgOwner,
          status: newPost.status,
          createDate: newPost.createDate,
          createTime: newPost.createTime,
          job: newPost.job,
          img: newPost.img,
          requestUser: [],
          seeByUser: false,
        })
        await User.findByIdAndUpdate(item._id, {notiNewPost: newArr, notiJob: newArrJob})
      })
      res.status(201).send("Apply user complete")
    } catch (err){
      console.log(err)
    }
  }
};

module.exports = PostController;
