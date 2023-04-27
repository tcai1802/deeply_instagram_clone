const express = require('express')
const userRoute = express.Router()
const { handleShowUserInfo, handleFindUsers, handleEditUser} = require('../controllers/userController')

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
userRoute.get("/search", handleFindUsers)
userRoute.patch("/:id", handleEditUser)
userRoute.get("/:id", handleShowUserInfo)
module.exports = userRoute