const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')
const Product = require('../models/Product')

module.exports = router