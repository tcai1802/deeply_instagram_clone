const UserModel = require('../models/userModel');
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


const handleEditUser = async (req, res) => {

}


module.exports = {
    handleShowUserInfo,
    handleEditUser,
}
