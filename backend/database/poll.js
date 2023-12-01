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
        numberOfVotes: Number
    }],
    usersThatVoted: [ {
        userId: {
            type: Mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        answers: [Number],
        default: []
    }]
});

module.exports = Mongoose.model('Poll', pollSchema);