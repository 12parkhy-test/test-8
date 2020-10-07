const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated, isAdmin } = require('../middlewares/authentication')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

router.get('/', isAdmin, async (req, res) => {
    await User.find()
        .select('-password')
        .sort({ date: -1 })
        .then((users) => { return res.json(users) })
})

router.post('/', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'All fields must be filled in' })
    }
    await User.findOne({ email: email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ msg: 'There is an account with that email' })
            }
            const newUser = new User({
                name,
                email,
                password
            })
            bcrypt.genSalt(10, (error, salt) => {
                if (error) throw error
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error
                    newUser.password = hash
                    newUser.save()
                        .then((user) => {
                            jwt.sign(
                                { id: user.id },
                                process.env.jwtSecret,
                                // { expiresIn: 1800 },
                                (error, token) => {
                                    if (error) throw error
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: 'All fields must be filled in' })
    }
    await User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ msg: 'There is not an account with that email' })
            }
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (!result) {
                        return res.status(400).json({ msg: 'Incorrect password, please try again' })
                    }
                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
                        // { expiresIn: 1800 },
                        (error, token) => {
                            if (error) throw error
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})

router.get('/user', isAuthenticated, async (req, res) => {
    await User.findById(req.user.id)
        .select('-password')
        .then((user) => {
            return res.json(user)
        })
        .catch((error) => { console.error(error) })
})

module.exports = router