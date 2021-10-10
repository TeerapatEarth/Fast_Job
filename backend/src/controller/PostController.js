const Post = require("../model/Post")

const PostController = {
    createPost: async function (req, res, next) {
        try {
            const { title, description, type, ownerId, status} = req.body;
            const post = await Post.create({
                title,
                description,
                type,
                ownerId,
                status
            })
            res.status(201).json(post)
        } catch (err){
            console.log(err)
        }
    },
    getAllPost: async function (req, res, next) {
        try{
            const allPost = await Post.find({})
            res.status(201).json(allPost)
        } catch (err){
            console.log(err)
        }
    },
    getOnePost: async function (req, res, next) {
        try{
            const { id } = req.params
            const post = await Post.findById(id)
            res.status(201).json(post)
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = PostController