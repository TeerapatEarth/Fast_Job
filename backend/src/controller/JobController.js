const Job = require('../model/Job')

const JobController = {
    createJob: async function (req, res, next){
        try {
            const { job } = req.body
            const jobCreate = await Job.create({
                job
            })
            res.status(201).json(jobCreate)
        } catch (err){
            console.log(err)
        }
    },
    getAllJob: async function (req, res, next){
        try{
            const allJob = await Job.find({})
            res.status(201).json(allJob)
        } catch (err){
            console.log(err)
        }
    },
    deleteJob: async function (req, res, next){
        try{
            const {id} = req.params
            await Job.findByIdAndDelete(id)
            res.status(201).send("Delete job completed")
        } catch(err){
            res.status(400).send(err)
        }
    }
}

module.exports = JobController