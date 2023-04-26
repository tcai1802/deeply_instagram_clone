const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const followingModel = new Schema({
    following_id: {
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

const FollowingModel = mongoose.model('following', followingModel)

module.exports = FollowingModel