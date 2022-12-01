const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true, lowercase:true, default:'Anonimo'},
    apellido: {type: String, required: true, default:'Anonimo'},
    correo: {type: String, required: true},
    edad: {type: Number, required: true, min:18, max: 98, default: 18},
    newsletter: {type: Boolean, required: true, default: true},
    favProducts : [ {type: mongoose.Types.ObjectId, ref: 'product'}],
    password: {type: String, required: true, min: 8},
    salt: {type: String, required: true},
    admin: {type :Boolean, required:true, default:false}

})

userSchema.methods.hashpass = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    
}

userSchema.methods.validatepass = function (password, salt, passwordDB){
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    return hash === passwordDB
}

userSchema.methods.generateToken = function (){
    const token = jwt.sign({id:this._id}, process.env.SECRET)
    return token
}

// se puede poner solo el tipo de dato si no quiero usar el objeto para más especificaciones como 'requerido
const User = mongoose.model('user', userSchema)

module.exports = User