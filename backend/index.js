const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database/database");


const app = express();

app.use(bodyParser.json())

app.get('/', function(req, res){
    res.redirect('/register');
});


app.get('/register', (req, res) => {
    res.render("../frontend/register/register.ejs")
})

app.post('/register', (req, res) => {
    try {
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