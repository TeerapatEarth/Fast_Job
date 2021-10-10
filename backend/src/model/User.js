const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, unique: true},
    password: { type: String },
    first_name : { type: String, default: null},
    last_name : { type: String, default: null},
    email: { type: String, unique: true},
    token: { type: String }
})

module.exports = mongoose.model('user', userSchema);