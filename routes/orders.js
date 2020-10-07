const express = require('express')
const { TokenExpiredError } = require('jsonwebtoken')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')
const CartItem = require('../models/CartItem')
const User = require('../models/User')
const { v4: uuid } = require('uuid')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripe = require('stripe')(process.env.stripe_secret_key)

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        let orderHistory = JSON.parse(user.orderHistory)
        if (orderHistory) {
            orderHistory.sort((a, b) => {
                if (a.date > b.date) {
                    return 1
                }
                else if (a.date < b.date) {
                    return -1
                }
                else {
                    return 0
                }
            })
            let temp = { ...orderHistory[orderHistory.length - 1] }
            temp.date = new Date(temp.date).toString()
            return res.json(temp)
        }
        else {
            return res.json({})
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/', isAuthenticated, async (req, res) => {
    const { cartItems, subtotal, taxes, tips, total, orderId, date, billing_details, receipt_url, shipping } = req.body
    const user = await User.findById(req.user.id)
    try {
        if (user.orderHistory) {
            //console.log("Exists")
            let orderHistory = JSON.parse(user.orderHistory)
            let order = { orderItems: cartItems, subtotal, taxes, tips, total, orderId, date, billing_details, receipt_url, shipping }
            orderHistory.push(order)
            user.orderHistory = JSON.stringify(orderHistory)
            user.cartItems = ''
            await user.save().then((user) => {
                const orderHistory = JSON.parse(user.orderHistory)
                return res.json(orderHistory)
            })
        }
        else {
            //console.log("Doesnt exists")
            const order = { orderItems: cartItems, subtotal, taxes, tips, total, orderId, date, billing_details, receipt_url, shipping }
            const orderHistory = [order]
            user.orderHistory = JSON.stringify(orderHistory)
            user.cartItems = ''
            await user.save().then((user) => {
                const orderHistory = JSON.parse(user.orderHistory)
                return res.json(orderHistory)
            })
        }
    }
    catch (error) {
        console.error(error)
    }
})

router.get('/history', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        let orderHistory = JSON.parse(user.orderHistory)
        if (orderHistory) {
            orderHistory.sort((a, b) => {
                if (a.date < b.date) {
                    return 1
                }
                else if (a.date > b.date) {
                    return -1
                }
                else {
                    return 0
                }
            })
            let temp = [...orderHistory]
            for (let i = 0; i < temp.length; i++) {
                temp[i].date = new Date(temp[i].date).toString()
            }
            return res.json(temp)
        }
        else {
            return res.json([])
        }
    }
    catch (error) {
        console.log(error)
    }
})

// router.get('/order/:id', isAuthenticated, async (req, res) => {
//     let orderIdInfo = req.params.id
//     console.log(req.params.id, 'orderIdInfo')
//     try {
//         const user = await User.findById(req.user.id)
//         let orderHistory = JSON.parse(user.orderHistory)
//         if (orderHistory) {
//             orderHistory.sort((a, b) => {
//                 if (a.date > b.date) {
//                     return 1
//                 }
//                 else if (a.date < b.date) {
//                     return -1
//                 }
//                 else {
//                     return 0
//                 }
//             })
//             let temp = []
//             for (let i = 0; i < orderHistory.length; i++) {
//                 if (orderHistory[i].orderId == orderIdInfo) {
//                     console.log('YES')
//                     temp.push(orderHistory[i])
//                     break
//                 }
//             }
//             console.log('temp', temp)
//             return res.json(temp[0])
//         }
//         else {
//             return res.json({})
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
// })

router.post('/checkout', isAuthenticated, async (req, res) => {
    const { orderInfo, stripeToken } = req.body
    const idempotencyKey = uuid()
    let { cartItems } = orderInfo
    let storage = {}
    storage.cartItems = cartItems
    storage.subtotal = orderInfo.subtotal
    storage.taxes = orderInfo.taxes
    storage.tips = orderInfo.tips
    storage.orderId = idempotencyKey
    storageStr = JSON.stringify(storage)
    let status
    let error

    try {
        const customer = await stripe.customers.create({
            email: stripeToken.email,
            source: stripeToken.id
        })

        const charge = await stripe.charges.create(
            {
                amount: (orderInfo.total).toFixed(2) * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: stripeToken.email,
                description: `${storageStr}`,
                shipping: {
                    name: stripeToken.card.name,
                    address: {
                        line1: stripeToken.card.address_line1,
                        line2: stripeToken.card.address_line2,
                        city: stripeToken.card.address_city,
                        country: stripeToken.card.address_country,
                        postal_code: stripeToken.card.address_zip
                    }
                }
            },
            {
                idempotencyKey
            }
        )
        status = 'success'
        return res.json({ error, status, charge, orderDate: new Date() })
    }
    catch (error) {
        console.log(error)
        status = 'failure'
        return res.json({ error, status, msg: 'Something went wrong, please try again' })
    }
})

module.exports = router

