const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product