const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const postModel = new Schema({
    post_id:  {
        type: ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        require: true, 
        index:true,
    },
    caption: {
        type: String,
        default: ""
    },
    media_list: {
        type: [String],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: ""
    },
})

const PostModel = mongoose.model('posts', postModel)

module.exports = PostModel