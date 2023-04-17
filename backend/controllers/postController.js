const jwt = require('jsonwebtoken')
const PostModel = require('../models/postModel')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const middleware = require('../middleware')


const handleAddPost = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.PRIVATE_KEY, async  (err, decoded) => {
        if (err) {
            res.json({
                "code": "invalid_token",
                "message": "Invalid token"
            })
        }
        else {
            // upload media   
            try {
                const urlList = await middleware.handleUploadMedia(req.files, res);
                const data = req.body;
                data.user_id = decoded.userDB.user_id.toString()
                data.media_list = urlList;
                const postModel = PostModel(data)
                postModel.save().then((result) => {
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
            } catch (error) {
                res.status(500).json({
                    "code": "failed",
                    "message": err,
                    "data": null
                })
            }


        }
    })
}

const handleEditPost = async (req, res) => {
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
            PostModel.findOneAndUpdate({ "post_id": req.params.id }, req.body).then((result) => {
                if (result) {
                    console.log("Data", result)
                    res.status(200).json({
                        "code": "successfully",
                        "message": "Update thành công",
                        "data": result
                    })

                } else {
                    res.status(200).json({
                        "code": "failed",
                        "message": "Update không thành công",
                        "data": result
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    "code": "failed",
                    "message": "Server error",
                    "data": err
                })
            });



        }
    })

}

const handleDeletePost = (req, res) => {
    console.log("Delete Post======")
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
            PostModel.findOneAndDelete({ "post_id": req.params.id }).then((result) => {
                if (result) {
                    console.log("Data", result)
                    res.status(200).json({
                        "code": "successfully",
                        "message": "Xóa thành công",
                        "data": result
                    })

                }
            }).catch((err) => {
                res.status(500).json({
                    "code": "failed",
                    "message": "Server error",
                    "data": err
                })
            });;
        }
    })
}


module.exports = {
    handleAddPost,
    handleEditPost,
    handleDeletePost,
}