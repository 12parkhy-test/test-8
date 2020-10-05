const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')
const CartItem = require('../models/CartItem')
const User = require('../models/User')

router.get('/', isAuthenticated, async (req, res) => {
    //console.log('orderHistory', orderHistory)
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
    console.log('req.body', req.body)
    const { cartItems, subtotal, taxes, tips, total, orderId, date } = req.body
    const user = await User.findById(req.user.id)
    try {
        if (user.orderHistory) {
            //console.log("Exists")
            let orderHistory = JSON.parse(user.orderHistory)
            let order = { orderItems: cartItems, subtotal, taxes, tips, total, orderId, date }
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
            const order = { orderItems: cartItems, subtotal, taxes, tips, total, orderId, date }
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

module.exports = router