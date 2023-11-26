const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database/database");
const path = require('path')
const {check, validationResult} = require('express-validator')


const app = express();

//De modificat
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(bodyParser.json())
app.use(cors())


//Probabil trebuie sters
app.get('/', function(req, res){
    res.render('main'); //De modificat
});


//Probabil trebuie sters
app.get('/register', (req, res) => {
    res.render('register') //De modificat
})

//Trebuie readaugata logica de check cu express-validator (cu custom pt parola) si sa vezi cum sa iei un res in react
app.post('/register',  (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        let email = req.body.email
        let password = req.body.password
        database.saveUser(email, password)
            .then((newUser) => {
                res.status(200).send(newUser)
            })
    } catch (error) {
        res.status(500).send("Error saving user: " + error.message)
    }
})
    
app.post('/login', (req, res) => {
    try {
        database.findUserByEmail(req.body.email, req.body.password)
            .then((user) => {
                if (user != null) {
                    res.status(200).send(user)
                } else {
                    res.status(200).send("NO USER WITH THAT EMAIL")
                }
            })
    } catch (error) {
        res.status(500).send("Error finding user: " + error.message)
    }
})

app.listen(5000, () => {
    console.log(("Server Started on port 5000"));
})