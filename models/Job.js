const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {type: String, required : true},
    comment: {type: String, required : true},
    paragraph: {type: String, required : true},
    imgUrl: {type: String, required : true}
})

const Job = mongoose.model('job', jobSchema)

module.exports = Job