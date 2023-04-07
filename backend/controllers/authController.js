const { validateEmailRegex } = require("../constants/regex");
const UserModel = require('../models/userModel')


// Register
const registerView = (req, res) => {
    const [email, password] = Object.values(req.body);

    if (validateEmailRegex.test(email)) {
        // handle to save account to server 
        res.status(200).json({
            "message": "Register successfully"
        })
    } else {
        console.log("Invalid")
    }
}

const handleSignUp = async (req, res) => {
    const [user_name, password] = Object.values(req.body);

    let userDB = await UserModel.findOne({ "user_name": user_name })


    if (userDB) {
        res.status(200).json({
            "code": "exits_account",
            "message": "Tài khoản tồn tại"
        })
    }
    else {
        user.save().then((value) => {
            if (value) {
                res.status(200).json({
                    "code": "successfully",
                    "message": "Đăng ký thành công"
                })
            }
        });
    }
}


// Login logic
const loginView = (req, res) => {
    res.send("Login View")
}

const handleLogin = async (req, res) => {
    const [user_name, password] = Object.values(req.body);

    let userDB = await UserModel.findOne({ "user_name": user_name })
    if (userDB) {
        if (password === userDB.password) {
            res.status(200).json({
                "code": "successfully",
                "message": "Đăng nhập thành công"
            })
        } else {
            res.status(200).json({
                "code": "password_incorrect",
                "message": "Mật khẩu không chính xác"
            })
        }
    } else {
        res.status(200).json({
            "code": "account_not_found",
            "message": "Tài khoản không tồn tại"
        })
    }



}
module.exports = {
    registerView,
    loginView,
    handleSignUp,
    handleLogin
}