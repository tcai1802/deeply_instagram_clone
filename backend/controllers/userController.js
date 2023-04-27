const UserModel = require('../models/userModel');
const {handleUploadMedia} = require('../middleware')


const handleShowUserInfo = async (req, res) => {
    const userId = req.body.user_id;
    console.log("===",userId);

    if(!userId) {
        res.json({
            "code": "failed",
            "message": "User id not found"
        })
    }else {
       const result = await UserModel.findOne({user_id: userId})
       res.json({
        "code": "successfully",
        "data": result,
       })
    }
}


const handleFindUsers = async (req, res) => {
    //console.log("Data", req.query)
    const data = await UserModel.find({user_name: { $regex: '.*' + req.query.word + '.*' }})
    res.json({
        "data": data
    })
}

const handleEditUser = async (req, res) => {
    const userId = req.params.id;
    let mediaUrl;
    try {
        if(req.body.avatar_url) {
            mediaUrl = await handleUploadMedia(req.files)
        }
        const data  = await UserModel.findOneAndUpdate({user_id: userId}, req.body)
        //console.log("====", data, userId);
        res.json({
            "code": "successfully",
            //"data": data
        })
    } catch (error) {
        res.json({
            "code": "failed",
            "data": error
        })
    }


}


module.exports = {
    handleShowUserInfo,
    handleEditUser,     
    handleFindUsers,
}
