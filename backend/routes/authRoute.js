const express = require('express')
const router = express.Router()
const {registerView, loginView, handleLogin, handleSignUp} = require('../controllers/authController');

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

module.exports = router;