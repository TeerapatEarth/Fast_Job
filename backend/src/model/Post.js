const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, default: null},
    description: { type: String, default: null },
    type : { type: String, default: null},
    ownerId: { type: String, unique: true},
    status: { type: Boolean }
})

module.exports = mongoose.model('post', postSchema);