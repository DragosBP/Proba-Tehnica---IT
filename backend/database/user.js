const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
    email: {
        type: String,
    },
    password: String,
    polls: [{
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "Poll"
    }]
});

module.exports = Mongoose.model('User', userSchema);