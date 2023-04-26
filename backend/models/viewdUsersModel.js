const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const viewedUsersModel = new Schema({
    viewed_id: {
        type: ObjectId,
        auto: true
    },
    user_id: {
        type:String,
        required: true
    },
    target_id: {
        type: String,
        required: true,
    },
})

const CommentModel = mongoose.model('viewed_users', viewedUsersModel)

module.exports = CommentModel