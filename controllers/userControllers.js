
const User = require('../models/User')
// const crypto = require('crypto')



const createUser = async (req, res) => {
    try {
        const verifyUser = await User.find({correo :req.body.correo})
         if(verifyUser.length){
            throw new Error ('email en uso')
        }
        
        // const salt = crypto.randomBytes(16).toString('hex')
        // const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex')
        // const newUser = new User({...req.body, password: hash, salt })
        
        const newUser = new User(req.body)
        newUser.hashpass(req.body.password)
        
        await newUser.save()
        
        res.json({succes : true, message : 'Usuario Agregado', id : newUser._id, token: newUser.generateToken()})
    } catch (e) {
        res.json({succes: false, message : e.message})
    }
    
}



const getUser = async (req, res) => {
    try{
        console.log(req.params)
        // const {id} = req.params
        // const result = await User.findById(id).populate('favProducts')
        // if (!result) {
        //     throw new Error ('hubo un problema, intenta de nuevo más tarde') 
        // }
       // que me muestre el error que quiero si no tiene o si el id está malo
        
       
        res.json({succes : true })
    }catch(e){
        res.json({succes: false, message : e.message})
    }
    
}


const deleteUser = async (req, res) => {
    try{
        const {id} = req.params
        const result = await User.findByIdAndDelete(id)
        if (!result) {
            throw new Error (' el elemento que intentas borrar no existe') 
        }
        res.json({succes: true, response: result  })
    }catch(e){
    res.json({succes : false, message : e.message})
}
}



const editUser = async (req, res) => {
    try{
        const {id} = req.params
        const result = await User.findByIdAndUpdate(id, req.body, {new:true})
        if(!result) {
            throw new Error('no es un id válido')
        }
        console.log(result)
        res.json({succes:true})
    }catch(e){
        res.json({succes : false, message : e.message})
    }
}


const login = async (req, res) => {
    try{
        const {correo, password} = req.body

        const user = await User.findOne({correo})
        if(!user){
            throw new Error('la cuenta no existe')
        }
        
        // const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')
       validatehash =  user.validatepass(password, user.salt, user.password)

        if (!validatehash){
            throw new Error('correo o clave incorrectos')
        }
        res.json({succes:true, message: 'llegué al login', token: user.generateToken()})
    }catch(e){
        res.json({succes:false, message: e.message})
    }
}

module.exports = {login, createUser, getUser, deleteUser, editUser }