const Mongoose = require("mongoose");

const pollSchema = new Mongoose.Schema({
    owner: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    title: String,
    isMultiple: Boolean,
    numberOfAnswers: Number,
    answers: [ {
        name: String,
        numberOfVotes: {
            type: Number,
            default: 0
        }
    }],
    usersThatVoted: [ {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "User",
        answers: [Number]
    }]
});

module.exports = Mongoose.model('Poll', pollSchema);