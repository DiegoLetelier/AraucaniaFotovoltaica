const Product = require('../models/Product')
const User = require('../models/User')

const createProduct = async (req, res) => {
    try{
        // const user = await User.findById(req.auth.id)
        // console.log(user.admin)
        //  if(!user.admin) {
        //  throw new Error('no tienes permiso para crear esto') 
        //  }
         
        const newProduct = new Product(req.body);
        await newProduct.save()
        res.json({succes: true, message: 'Producto Agregado', id : newProduct._id })
    }catch(e){
        res.json({succes: false, message: e.message})
    }
}

 const getQtyProducts = async (req,res) => {
    try{
        const qty = req.params.qty
        const products = await Product.find().limit(qty)
        res.json({succes: true,  products})
    }catch (e){
        res.json({succes: false, message: e.message})
    }
 }   



const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find() 
        
        res.json({succes:true, message: products})
    }catch (e){
        res.json({succes: false, message: e.message})
    }
}

const editProduct = async (req, res) => {
    try{ 
    const {id} = req.params
    const result = await Product.findByIdAndUpdate(id, req.body, {new:true})
    if(!result) {
        throw new Error('no es un id válido')
    }
    console.log(result)
    res.json({succes:true})

    }catch(e){
        res.json({succes: false, message: e.message})
    }
}

module.exports = {createProduct, getAllProducts, getQtyProducts, editProduct}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmFiMWI3MmNhYzM5YzkwYjFjZWZmOCIsImlhdCI6MTY2NzkzNjY5Nn0.w2QxxQMLk9no-Ll6VjMkbbd3Z6_0AF3aVnRU84ARTgM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmFiMzg0ODNiNDg3NGFlZjBmZjhmYSIsImlhdCI6MTY2NzkzNzE1Nn0.cprxSFpywqTxbOldlpYQgH-cbtN5ZELhdFENhnM5kzg