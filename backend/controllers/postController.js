const jwt = require('jsonwebtoken')
const {PostModel, FavoriteModel} = require('../models')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const {handleUploadMedia} = require('../middleware')



const handleShowAllPosts = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
        if (err) {
            res.json({
                "code": "invalid_token",
                "message": "Invalid token"
            })
        }
        else {
            // upload media   
            try {
                const result  = await PostModel.find()
                res.status(200).json({
                    "code": "successfully",
                    "message": "OK",
                    "data": result
                })
            } catch (error) {
                res.status(401).json({
                    "code": "failed",
                    "message": error,
                    "data": null
                })
            }


        }
    })
}



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
            try {
                const data = req.body;
                const urlList = await handleUploadMedia(req.files)
                data.user_id = decoded.user_id.toString()
                data.media_list = urlList;
                const postModel = PostModel(data)
                postModel.save().then((result) => {
                    res.status(200).json({
                        "code": "successfully",
                        "message": "Create post successfully",
                        "data": result
                    })
                }).catch((err) => {
                    //console.log("Error", err)
                    res.status(200).json({
                        "code": "failed",
                        "message": err,
                        "data": null
                    })
                });
            } catch (error) {
                res.status(500).json({
                    "code": "server_error",
                    "message": error,
                    "data": null
                })
            }


        }
    })
}

const handleEditPost = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]
    //console.log("Data", bodyNew)
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
        if (err) {
            res.json({
                "code": "invalid_token",
                "message": "Invalid token"
            })
        }
        else {
            PostModel.findOneAndUpdate({ "post_id": req.params.id }, {...req.body, "updated_at": Date.now()}).then((result) => {
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
    //console.log("Delete Post======")
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

const handleLikeOrNotPost = async (req, res) => {
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
            if(req.body.user_id) {
                FavoriteModel.findOne({ "target_id": req.params.id, "user_id": req.body.user_id }).then((result) => {
                    if (result) {
                        console.log("Data", result)
                        FavoriteModel.findOneAndDelete({ "target_id": req.params.id, "user_id": req.body.user_id }).then((result) => {
                            res.status(200).json({
                                "code": "successfully",
                                "message": "Liked",
                                "data": result
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                "code": "failed",
                                "message": "Failed",
                            })
                        });
                        
    
                    } else {
                        const model = FavoriteModel({
                            user_id: req.body.user_id,
                                target_id: req.params.id,
                        })
                        model.save().then((result) => {
                            res.status(200).json({
                                "code": "successfully",
                                "message": "Update thành công",
                                "data": result
                            })
                        }).catch((err) => {
                            //console.log("Error", err)
                            res.status(500).json({
                                "code": "failed",
                                "message": err,
                                "data": null
                            })
                        });
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "code": "failed",
                        "message": "Server error",
                        "data": err
                    })
                });
            }else {
                res.status(200).json({
                    "code": "failed",
                    "message": "Update không thành công",
                    "data": null
                })
            }
            

        }
    })
}


module.exports = {
    handleAddPost,
    handleEditPost,
    handleDeletePost,
    handleShowAllPosts,
    handleLikeOrNotPost,
}