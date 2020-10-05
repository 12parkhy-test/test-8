const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    productQuantity: {
        type: Number
    },
    productPrice: {
        type: Number
    },
    productDescription: {
        type: String
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const CartItem = mongoose.model('cartitem', CartItemSchema)

module.exports = CartItem

