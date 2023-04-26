const express = require('express')
const commentRoute = express.Router()
const User = require('../config/firebase.config')
const {addDoc} = require('firebase/firestore') 
const {getMessaging, getToken} =  require('firebase/messaging')
const FCM = require('fcm-node')

const fcm = new FCM(process.env.SERVER_KEY)
commentRoute.use((req, res, next) => {
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

commentRoute.post("/", async (req, res) => {
    //console.log("User",User)
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'registration_token', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
    //await User.add({"data": "Hello"})
    res.json({
        "data": "Add comment"
    })
})

module.exports = commentRoute;