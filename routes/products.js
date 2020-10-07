const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')
const Product = require('../models/Product')

router.get('/', isAuthenticated, async (req, res) => {
    await Product.find()
        .sort({ date: -1 })
        .then((products) => { return res.json(products) })
})

router.post('/', isAdmin, async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    await newProduct.save()
        .then((product) => { return res.json(product) })
})

router.delete('/:id', isAdmin, async (req, res) => {
    await Product.findById(req.params.id)
        .then((product) => { product.remove().then(() => { return res.json({ msg: `Successfully deleted ${product.name}` }) }) })
        .catch((error) => { return res.status(404).json({ msg: 'Something is wrong' }) })
})

module.exports = router