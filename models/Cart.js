const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'user'},
    productsId: [
    {
    productId: {type: mongoose.Types.ObjectId, ref: 'product'},
    qty: {type : Number}
    },
]
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart