const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const storyModel = new Schema({
    story_id: {
        type: ObjectId,
        auto: true
    },
    user_id: {
        type:String,
        required: true
    },
    media_url: {
        type:String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
})

const StoryModel = mongoose.model('stories', storyModel)

module.exports = StoryModel