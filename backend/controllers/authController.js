const { validateEmailRegex } = require("../constants/regex");
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
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
    if (user_name && password) {
        let userDB = await UserModel.findOne({ "user_name": user_name })
        if (userDB) {
            res.status(200).json({
                "code": "exits_account",
                "message": "Tài khoản tồn tại"
            })
        }
        else {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hashPass) {
                    const user = UserModel({
                        user_name: user_name,
                        password: hashPass,
                    })
                    // generate jwt 
                    var token = jwt.sign({user}, process.env.PRIVATE_KEY)

                    user.save().then((value) => {
                        if (value) {
                            res.status(200).json({
                                "code": "successfully",
                                "message": "Đăng ký thành công",
                                "data": value
                            })
                        } else {
                            res.status(400).json({
                                "code": "error",
                                "message": "Đăng ký không thành công"
                            })
                        }
                    });
                })
            })

        }
    }
}


// Login logic
const loginView = (req, res) => {
    res.send("Login View")
}

const handleLogin = async (req, res) => {
    const [user_name, password] = Object.values(req.body);
    console.log(`${username}, ${password}`)
    let userDB = await UserModel.findOne({ "user_name": user_name })
    if (userDB) {
        const isSame = await bcrypt.compare(password, userDB.password)

        if (isSame) {
            var token = jwt.sign({userDB}, process.env.PRIVATE_KEY)
            //console.log("id", userDB._id)
            const data = await UserModel.findOneAndUpdate({"user_id": userDB.user_id}, {"token": token})
            res.status(200).json({
                "code": "successfully",
                "message": "Đăng nhập thành công",
                "data": userDB
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
            "message": "Tài khoản không tồn tại",
            "data": userDB
        })
    }



}
module.exports = {
    registerView,
    loginView,
    handleSignUp,
    handleLogin
}