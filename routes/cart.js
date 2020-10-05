const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')
const CartItem = require('../models/CartItem')
const User = require('../models/User')

router.get('/', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id)
    let cartItems = JSON.parse(user.cartItems)
    if (cartItems) {
        return res.json(cartItems)
    }
    else {
        return res.json([])
    }
})

router.post('/', isAuthenticated, async (req, res) => {
    const { id, name, price, description, quantity } = req.body
    const user = await User.findById(req.user.id)
    try {
        if (user.cartItems) {
            //console.log("Exists")
            let found = false
            let cartItems = JSON.parse(user.cartItems)
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].productId == id) {
                    cartItems[i].productQuantity = cartItems[i].productQuantity + quantity
                    user.cartItems = JSON.stringify(cartItems)
                    await user.save().then((user) => {
                        const cart = JSON.parse(user.cartItems)
                        return res.json(cart)
                    })
                    found = true
                    break
                }
            }
            if (!found) {
                const cartItem = {
                    productName: name,
                    productPrice: price,
                    productQuantity: quantity,
                    productDescription: description,
                    productId: id
                }
                cartItems.push(cartItem)
                user.cartItems = JSON.stringify(cartItems)
                await user.save().then((user) => {
                    const cart = JSON.parse(user.cartItems)
                    return res.json(cart)
                })
                return
            }
            else {
                return
            }
        }
        else {
            //console.log("Doesnt exists")
            const cartItem = {
                productName: name,
                productPrice: price,
                productQuantity: quantity,
                productDescription: description,
                productId: id
            }
            const cartItems = [cartItem]

            user.cartItems = JSON.stringify(cartItems)
            await user.save().then((user) => {
                const cart = JSON.parse(user.cartItems)
                return res.json(cart)
            })
        }
    }
    catch (error) {
        console.error(error)
    }
})

router.delete('/:id', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id)
    let cartItems = JSON.parse(user.cartItems)
    let filteredCartItems = cartItems.filter((cartItem)=> {return cartItem.productId != req.params.id})
    user.cartItems = JSON.stringify(filteredCartItems)
    await user.save()
    .then((user) => {
        return res.json({ msg: `Successfully deleted a cart item`})
    })
    .catch((error) => { return res.status(404).json({ msg: 'Something is wrong' }) })
})

module.exports = router