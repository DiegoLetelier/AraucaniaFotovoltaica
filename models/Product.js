const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    model: String,
    price: Number,
    imgurl: String,
    stock: Number,
    properties : [
        {
        item : String,
        value: String
        }
     ]
})

const Product = mongoose.model('product', productSchema)

module.exports = Product