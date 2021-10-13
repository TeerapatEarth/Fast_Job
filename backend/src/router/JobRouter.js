const express = require("express");
const router = express.Router();

const JobController = require('../controller/JobController')
router.post('/job/create', JobController.createJob)
router.get('/job', JobController.getAllJob)
router.delete('/job/delete/:id', JobController.deleteJob)

module.exports = router