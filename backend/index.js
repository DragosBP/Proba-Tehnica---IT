const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database/database");
const path = require('path')
const {check, validationResult} = require('express-validator')
const bcrypt = require("bcrypt")


const app = express();

//De modificat
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use(bodyParser.json())
app.use(cors())


//Probabil trebuie sters
// app.get('/', function(req, res){
//     res.render('main'); //De modificat
// });


//Probabil trebuie sters
// app.get('/register', (req, res) => {
//     res.render('register') //De modificat
// })

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
    
app.post('/login', async (req, res) => {
    try {
        database.findUserByEmail(req.body.email)
            .then((user) => {
                if (user == null) {
                    return res.status(200).send("The email addres or password you entter is invalid") //TODO: Vezi exact ce status ar trebui trimis aici
                } else {
                    bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch)
                            return res.status(200).send("The email addres or password you entter is invalid") //TODO: Vezi exact ce status ar trebui trimis aici
                        else {
                            //TODO Adauga logica de Session
                            return res.status(200).send("EMAIL GOOD")
                        }
                    })
                }
            })
    } catch (error) {
        res.status(500).send("Error finding user: " + error.message)
    }
})

app.listen(5000, () => {
    console.log(("Server Started on port 5000"));
})