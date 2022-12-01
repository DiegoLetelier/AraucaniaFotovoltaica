const Job = require('../models/Job')


const createJob = async (req, res) => {
    try{
         
        const newJob = new Job(req.body);
        await newJob.save()
        res.json({succes: true, message: 'Trabajo Agregado', id : newJob._id })
    }catch(e){
        res.json({succes: false, message: e.message})
    }
}

const getQtyJobs = async (req,res) => {
    try{
        const qty = req.params.qty
        const jobs = await Job.find().limit(qty)
        res.json({succes: true,  jobs})
    }catch (e){
        res.json({succes: false, message: e.message})
    }
 }   


module.exports = {createJob, getQtyJobs}