const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job: {type: String, default: null}
})

module.exports = mongoose.model('job', jobSchema);