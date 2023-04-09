const jwt = require('jsonwebtoken')
const PostModel = require('../models/postModel')
const mongoose = require('mongoose')
const handleAddPost = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
        if (err) {
            res.json({
                "code": "invalid_token",
                "message": "Invalid token"
            })
        }
        else {
            //console.log("Token",decoded)
            const data = req.body;
            data.user_id = decoded.userDB.user_id.toString()
            const postModel = PostModel(data)
            postModel.save().then((result) => {
                console.log('Result', result)
                res.status(200).json({
                    "code": "successfully",
                    "message": "Create post successfully",
                    "data": result
                })
            }).catch((err) => {
                console.log("Error", err)
                res.status(500).json({
                    "code": "failed",
                    "message": err,
                    "data": null
                })
            });

        }
    })
}

const handleEditPost = (req, res) => {

    res.json({
        "method": "Edit Post"
    })
}

const handleDeletePost = (req, res) => {
    res.json({
        "method": "Delete Post"
    })
}

module.exports = {
    handleAddPost,
    handleEditPost,
    handleDeletePost
}