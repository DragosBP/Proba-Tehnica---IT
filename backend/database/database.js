const Mongoose = require("mongoose");
const User = require("./user.js");
const Poll = require("./poll.js");
const Session = require("./session_id.js")
const { error } = require("console");
const user = require("./user.js");

Mongoose.connect("mongodb://localhost/database").then(console.log("Database started succesfully"));

// saveUser("mynamesjeff@gmail.com", "jeff's awesome")
// saveUser("ironman@yahoo.com", "CaptainAmericaSucks")

// module.exports = saveUser

async function saveUser(userEmail, userPassword) {
    return User.create({
        email: userEmail,
        password: userPassword,
    })
    .then((newUser) => {
        console.log("New User: ", newUser)
        return newUser.toJSON()
    })
    .catch((error) => {
        console.error("Error saving user: ", error)
        throw error
    })
}

async function findUserByEmail(userEmail) {
    return User.findOne({
        email: userEmail
    })
        .then((user) => {
            if (user != null) {
                console.log("User found by email: ", user)
            } else {
                console.log("User not found by email")
            }
            return user
        })
        .catch((error) => {
            console.error("Error searching user by email: ", error)
            throw error
        })
}

async function saveSession(sessionId, userId) {
    Session.create({
        sessionId: sessionId,
        userId: userId
    })
}

async function addPoll(userId, title, isMultiple, numberOfAnswers, answersWithoutVotes) {
    const answersWithVotes = answersWithoutVotes.map(answer => ({
        name: answer,
        numberOfVotes: 0
      }));
    return Poll.create({
        owner: userId,
        title: title,
        isMultiple: isMultiple,
        numberOfAnswers: numberOfAnswers,
        answers: answersWithVotes
    })
    .then((newPoll) => {
        console.log("New Poll: ", newPoll)
        return newPoll.toJSON()
    })
    .catch((error) => {
        console.error("Error saving poll: ", error)
        throw error
    })
}

async function getPolls() {
    const allPolls = await Poll.find();
    return allPolls;
}

async function deletePoll(pollId) {
    const poll = await Poll.findById(pollId);
    const owner = poll.owner
    
    await User.updateOne(
        { _id: owner },
        { $pull: { polls: pollId } }
    )

    const deletedPoll = await Poll.findByIdAndDelete(pollId);
    if (deletedPoll) {
        console.log(`Poll ${pollId} deleted`)
    } else {
        console.log(`Poll not found: ${pollId}`)
    }
}

module.exports = {saveUser, findUserByEmail, saveSession, addPoll, getPolls, deletePoll}
