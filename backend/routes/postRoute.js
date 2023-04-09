const express = require('express')
const jwt = require('jsonwebtoken')
const postRouter = express.Router()
const { handleAddPost, handleEditPost, handleDeletePost } = require('../controllers/postController')

postRouter.use((req, res, next) => {
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

postRouter.post("/add_post", handleAddPost)
postRouter.put("/:id", handleEditPost)
postRouter.delete("/:id", handleDeletePost)

module.exports = postRouter