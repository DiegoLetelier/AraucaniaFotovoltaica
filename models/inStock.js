const mongoose = require('mongoose')

const inStockSchema = new mongoose.Schema({
    productId :
 [ {type: mongoose.Types.ObjectId, ref: 'product'}]


})