const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const postModel = new Schema({
    post_id: ObjectId,
    caption: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
        default: [],
    },
    user_id: {
        type: String,
        require: true, 
        index:true,
    },
    total_likes: {
        type: Number,
        default: 0,
    },
    total_comments: {
        type: Number,
        default: 0,
    },
    media_list: {
        type: Array,
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