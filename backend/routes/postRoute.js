const express = require('express')
const postRouter = express.Router()
const { handleAddPost, handleEditPost, handleDeletePost, handleShowAllPosts, handleLikeOrNotPost} = require('../controllers/postController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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

postRouter.post("/:id/favorite",  handleLikeOrNotPost)
postRouter.post("/add_post", upload.array('photos', 12),  handleAddPost)
postRouter.get("/all_posts", handleShowAllPosts)
postRouter.put("/:id", handleEditPost)
postRouter.delete("/:id", handleDeletePost)

module.exports = postRouter