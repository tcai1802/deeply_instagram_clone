const express = require('express')
const userRoute = express.Router()
const { handleShowUserInfo} = require('../controllers/userController')

userRoute.use((req, res, next) => {
    // Post middleware
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next()

    } else {
        res.json({
            "code": "unauthenticated",
            "message": "Not Authorized"
        })
    }
})

userRoute.get("/:id", handleShowUserInfo)

module.exports = userRoute