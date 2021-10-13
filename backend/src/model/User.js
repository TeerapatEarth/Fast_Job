const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, unique: true},
    password: { type: String },
    first_name : { type: String, default: null},
    last_name : { type: String, default: null},
    email: { type: String, unique: true},
    token: { type: String },
    dateOfBirth: { type: Date, default: null},
    ban: { type: Boolean, default: false},
    role: { type: String, default: "General User"},
    job: { type: String, default: null},
    reportCount: { type: Number, default: 0 }
})

module.exports = mongoose.model('user', userSchema);