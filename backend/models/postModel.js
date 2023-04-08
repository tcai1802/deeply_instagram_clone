const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const postModel = new Schema({
    post_id: ObjectId,
    user_name: String,
    password: String,
    avatar_url: {
        type: String,
        default: ""
    },
    token: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel