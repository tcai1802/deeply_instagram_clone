const express = require('express')
const router = express.Router()
const {registerView, loginView, handleLogin, handleSignUp} = require('../controllers/authController');
const {getMessaging} = require('firebase-admin/messaging')
const app = require('../config/firebase-admin.config')
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the login route
router.post('/login', handleLogin)
router.get('/login', loginView)
// define the register route
router.post('/register', handleSignUp)
router.get('/register', registerView)
router.get('/fcm', (req, res, next) => {
// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
    'fd91EimjStaNsIqEJ0R26A:APA91bEvyRHqSlM4JYT-tRQICQCZwcFUg82PqjgaP-ttZGEeiXa0n8LmqPfCAAtCYdSFkqU4SRCsCRgbHmTfStChhXBvG_lCUy6IttV_oMPirRZYNekGCLjwamXMv45TDBUf6lRsxIQf',
    'fd91EimjStaNsIqEJ0R26A:APA91bEvyRHqSlM4JYT-tRQICQCZwcFUg82PqjgaP-ttZGEeiXa0n8LmqPfCAAtCYdSFkqU4SRCsCRgbHmTfStChhXBvG_lCUy6IttV_oMPirRZYNekGCLjwamXMv45TDBUfd6lRsxIQf',
    // …
  ];
  
  const message = {
    data: {score: '850', time: '2:45'},
    tokens: registrationTokens,
  };
  console.log("==", MulticastMessage)
  getMessaging(app).sendMulticast(message)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
      res.json({"message": response})
    });
})

module.exports = router;