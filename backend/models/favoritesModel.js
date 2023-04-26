const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const favoritesModel = new Schema({
    favorite_id: {
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

const FavoritesModel = mongoose.model('favorites', favoritesModel)

module.exports = FavoritesModel