const Mongoose = require("mongoose");
const User = require("./user.js");
const Poll = require("./poll.js");
const { exit } = require("process");

Mongoose.connect("mongodb://localhost/database")
    .then(console.log("Database started succesfully"))
    .then(User.deleteMany().then(console.log("Users are deleted")))
    .then(Poll.deleteMany().then(console.log("Polls are deleted")))
    .then(exit)
