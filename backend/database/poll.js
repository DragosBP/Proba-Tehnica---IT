const Mongoose = require("mongoose");

const pollSchema = new Mongoose.Schema({
    owner: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    opinion: String,
    type: String,
    numberOfAnswers: Number,
    answers: [ {
        name: String,
        numberOfVotes: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = Mongoose.model('Poll', pollSchema);