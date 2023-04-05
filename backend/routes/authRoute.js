const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/login', (req, res) => {
    
    res.send('Login')
})
// define the about route
router.get('/register', (req, res) => {
    res.send('Sign up')
})

module.exports = router;