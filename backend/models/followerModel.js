const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const followerModel = new Schema({
    follower_id: {
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

const FollowerModel = mongoose.model('followers', followerModel)

module.exports = FollowerModel