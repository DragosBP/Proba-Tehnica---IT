const Mongoose = require("mongoose");
const User = require("./user.js");
const Poll = require("./poll.js");
const { exit } = require("process");

Mongoose.connect("mongodb://localhost/database").then(console.log("Database started succesfully"))

//A fost penttru testare

const db = Mongoose.connection;

db.dropDatabase()
  .then(() => {
    console.log('Database dropped successfully');
  })
  .catch((error) => {
    console.error('Error dropping database:', error);
  });