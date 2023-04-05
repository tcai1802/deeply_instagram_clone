const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()
const path = require('path')
const authRoute = require('./routes/authRoute')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/auth', authRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})