const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const collectionModel = new Schema({
    collection_id: {
        type: ObjectId,
        auto: true
    },
    user_id: {
        type:String,
        required: true
    },
    stories_list: [String]
})

const CollectionModel = mongoose.model('collection', collectionModel)

module.exports = CollectionModel