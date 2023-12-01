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
    if (token == null) res.status(401).send("NO LOGGED IN because NO TOKEN") // Pot modifica mai tarziu mesaju
    jwt.verify(token, "ARTREBUIECEVADESTEPTFACUTAICIPOATECUUNREFRESHTOKEN", (err, userId) => {
        if (err) return res.status(402).send("NO LOGGED IN because TOKEN DEAD") // Post modifica mai tarziu mesajul
        req.userId = userId
        next()
    })
}


app.get('/polls', authentificateToken, (req, res) => {
    // console.log(req.userId)
    res.status(200).send("USER IS LOGGED IN")
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

app.post('/polls/create', authentificateToken, (req, res) => {
    try {
        console.log(req.body)
        res.status(200)
    } catch (error) {
        res.status(500).send("Error finding user: " + error.message)
    }
})

app.listen(5000, () => {
    console.log(("Server Started on port 5000"));
})