
const User = require('../models/User')

const getUsers = async (req, res) => {
    try{
        const users = await User.find()

        // get this function to show a list of users if needed

        res.json({succes: true, users})
    }catch(e){
        res.json({succes:false , message : e.message})
    }
} 

module.exports = getUsers

