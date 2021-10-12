const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, default: null},
    description: { type: String, default: "" },
    type : { type: String, default: null},
    ownerId: { type: String, default: null},
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model('post', postSchema);