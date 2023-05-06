const authController = require('./authController')
const postController = require('./postController')
const userController = require('./userController')
const commentController = require('./commentController')
const favoriteController = require('./favoriteController')
module.exports = {
    authController,
    favoriteController,
    postController,
    userController,
    commentController,
}