const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const router = express.Router()
require('dotenv').config()
const path = require('path')
const authRoute = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')
const userRoute = require('./routes/userRoute')
const favoriteRoute = require('./routes/favoriteRoute')
const { mongoConnect } = require('./connection/mongo_connection')


app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
mongoConnect()
// Route List
app.use('/auth', authRoute);
app.use('/posts', postRouter);
app.use('/comments', commentRoute);
app.use('/users', userRoute);
app.use('/favorites',favoriteRoute)
app.listen(process.env.PORT || 4000, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})