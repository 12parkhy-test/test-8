const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const isAuthenticated = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'There is no token, unauthorized' })
    }
    try {
        const decodedUser = jwt.verify(token, process.env.jwtSecret)
        req.user = decodedUser
        next()
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ msg: 'Invalid token' })
    }
}

const isAdmin = async (req, res, next) => {
    const token = await req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'There is no token, unauthorized' })
    }
    try {
        const decodedUser = jwt.verify(token, process.env.jwtSecret)
        if (decodedUser.id == process.env.adminId) {
            console.log("I am an admin")
            req.user = decodedUser
            next()
        }
        else {
            console.log("I am not an admin")
            return res.status(401).json({ msg: 'Unauthorized, only admin has authorization' })
        }
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ msg: 'Invalid token' })
    }
}

module.exports = { isAuthenticated, isAdmin }