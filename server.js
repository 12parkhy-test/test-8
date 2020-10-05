const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const cartRouter = require('./routes/cart')
const ordersRouter = require('./routes/orders')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log('Successfully connected to MongoDB') })
    .catch((error) => { console.log(error) })

app.use('/api/', indexRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', ordersRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => { console.log(`Server is running on port ${port}`) })