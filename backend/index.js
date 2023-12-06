const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database/database");
const path = require('path')
const {check, validationResult} = require('express-validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express();

//TODO Adauga mai multa logica de verificare a userului, in caz ca a stat de ceva timp pe site

app.use(bodyParser.json())
app.use(cors())


function authentificateToken(req, res, next) {
    const token = req.headers['authorization']
    if (token == null) res.status(422).send("NO LOGGED IN because NO TOKEN") // Pot modifica mai tarziu mesaju
    jwt.verify(token, "ARTREBUIECEVADESTEPTFACUTAICIPOATECUUNREFRESHTOKEN", (err, userId) => {
        if (err) return res.status(498).send("NO LOGGED IN because TOKEN DEAD") // Pot modifica mai tarziu mesajul
        req.userId = userId
        next()
    })
}


app.get('/user', authentificateToken, (req, res) => {
    res.status(200).send(req.userId.userId)
})

app.get('/polls', (req, res) => {
    try {
        database.getPolls()
            .then((polls) => {
                let pollIdList = [];
                let ownerIdList = [];
                let titleList = [];
                let isMultipleList = [];
                let numberOfAnswersList = [];
                let answersList = [];
                let usersThatVotedList = [];

                polls.forEach((poll) => {
                    pollIdList.push(poll._id);
                    ownerIdList.push(poll.owner);
                    titleList.push(poll.title);
                    isMultipleList.push(poll.isMultiple);
                    numberOfAnswersList.push(poll.numberOfAnswers);
                    answersList.push(poll.answers);
                    usersThatVotedList.push(poll.usersThatVoted);
                });
                res.status(200).json({
                    pollIdList,
                    ownerIdList,
                    titleList,
                    isMultipleList,
                    numberOfAnswersList,
                    answersList,
                    usersThatVotedList,
                });
            })
    } catch (error) {
        res.status(500).send("Error getting polls: " + error.message)
    }
})

//Verifica emailul si parola dava sunt valide, daca nu sunt, trimtie un (400), altfel creeaza noul user
app.post('/register', [
    check('email')
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async value => {
        const user = await database.findUserByEmail(value)
        if (user)
            throw new Error("Email already in use")
    })
    .withMessage("Email already in use"),
    check('password')
    .isLength({min: 8, max: 32})
    .withMessage("Password must be between 8 and 32 characters")
    .custom(async (value, {req}) => {
        const passwordConfirm = req.body.passwordConfirm
        if (value != passwordConfirm)
            throw new Error("Password do not match")
    })
    .withMessage("Passwords do not match")
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errArray = errors.array()
            res.status(200) //TODO Vezi exact ce status ar trebui trimis aici
            return res.send(errArray[0].msg)
        }
        let email = req.body.email
        let password = await bcrypt.hash(req.body.password, 10)
        database.saveUser(email, password)
            .then((newUser) => {
                res.status(200).send("Account created with succes!") //TODO Trebuie sters "newUser" mai tarziu
            })
    } catch (error) {
        res.status(500).send("Error saving user: " + error.message)
    }
})

//
app.post('/login', [
    check('email')
    .custom(async (value, {req}) => {
        const user = await database.findUserByEmail(value)
        if (user == null)
            throw new Error("CEVA")
        if (req.body.password == null)
            throw new Error("CEVA")
        bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
            if (!isMatch)
                throw new Error("The email addres or password you entter is invalid")
        })
    })
    .withMessage("The email address or password you entter is invalid")
],async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).send(errors.array()[0].msg) //TODO Cauta statusul exact
        }
        database.findUserByEmail(req.body.email)
            .then((user) => {
                const userId = {userId: user._id}
                const token = jwt.sign(userId, "ARTREBUIECEVADESTEPTFACUTAICIPOATECUUNREFRESHTOKEN", {expiresIn: '60m'})
                res.status(200).send(token)
                
            })
    } catch (error) {
        res.status(500).send("Error finding user: " + error.message)
    }
})

//
app.post('/logout', (req, res) => {
    res.status(200).send("USE LOGGED OUT")
})

app.post('/polls/create', [
    authentificateToken,
    check('title')
    .notEmpty()
    .withMessage("Tile cannot be empty")
    ], (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).send("Title cannot be empty")
        }
        let userId = req.userId.userId
        let title = req.body.title
        let isMultipleChoice = req.body.isMultipleChoice
        let numberOfAnswers = req.body.numberOfAnswers
        let answers = req.body.answers
        database.addPoll(userId, title, isMultipleChoice, numberOfAnswers, answers)
            .then((newPoll) => { 
                res.status(200).send("Poll created with succes")
            })
        
    } catch (error) {
        res.status(500).send("Error finding user: " + error.message)
    }
})

app.listen(5000, () => {
    console.log(("Server Started on port 5000"));
})