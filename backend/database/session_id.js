const Mongoose = require("mongoose")

const sessionSchem = new Mongoose.Schema({
    sessionId: String,
    userId: Mongoose.SchemaTypes.ObjectId
})

module.exports = Mongoose.model('Session', sessionSchem)