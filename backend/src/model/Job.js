const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job: {type: String, default: null},
    user: {type: Array, default: []}
})

module.exports = mongoose.model('job', jobSchema);