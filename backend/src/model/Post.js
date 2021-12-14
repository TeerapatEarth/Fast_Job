const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, default: null},
    description: { type: String, default: "" },
    type : { type: String, default: null},
    ownerId: { type: String, default: null},
    first_name: { type: String, default: null},
    last_name: { type: String, default: null},
    imgOwner: { type: String, default: null},
    job: { type: String, default: null},
    status: { type: Boolean, default: true },
    createDate: { type: String, default: "" },
    createTime: { type: String, default: ""},
    img:{ type: String, default: null},
    requestUser: {type: Array, default: []}
})

module.exports = mongoose.model('post', postSchema);