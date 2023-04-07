const mongoose = require('mongoose')

const mongoConnect = () => {
    // handle to connect mongodb
    console.log("URL", process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected"))

}

module.exports = {
    mongoConnect
}