const Mongoose = require("mongoose");
const User = require("./user.js");
const Poll = require("./poll.js");
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

async function addPoll(pollId, userId) {

}

module.exports = {saveUser, findUserByEmail}
