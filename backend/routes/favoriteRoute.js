const express = require('express')
const favoriteRoute = express.Router()
const User = require('../config/firebase.config')
const {addDoc} = require('firebase/firestore') 
const {getMessaging, getToken} =  require('firebase/messaging')
const FCM = require('fcm-node')
const {favoriteController} = require('../controllers')

const fcm = new FCM(process.env.SERVER_KEY)
favoriteRoute.use((req, res, next) => {
    // Post middleware
    //const authHeader = req.headers.authorization;
    //if (authHeader) {
    //    next()

    //} else {
    //    res.json({
    //        "code": "unauthenticated",
    //        "message": "Not Authorized"
    //    })
    //}
    next()
})
favoriteRoute.get("/:id",favoriteController.handleShowFavorite)

favoriteRoute.post("/:id",favoriteController.handleFavoriteOrNot)

module.exports = favoriteRoute;