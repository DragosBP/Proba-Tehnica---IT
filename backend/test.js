const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(bodyParser.json())

app.get('/produse', (req, res) => {
    res.status(200).send({produs: "Lapte", pret: 5.5})
})

app.post('/produse', (req, res) => {
    let produs = req.body.produs
    let pret = req.body.pret
    pret = pret * 2;
    produs = produs + " nou";
    let dataModificare = new Date();
    res.status(200).send({produs: produs, pret: pret, dataModificare: dataModificare});
})

app.listen(5000, () => {
    console.log(("Server Started on port 5000"));
})