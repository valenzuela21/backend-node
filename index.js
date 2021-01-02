const express = require('express');
const cors = require('cors')
// Var Globals Entorno
require('dotenv').config();
const { dbConneccion } = require('./database/config');
const app = express();

const port = process.env.PORT
/*DB Connections*/
dbConneccion();

app.use(cors());

/*
* user: main_user
* pass: FpD1Dg8cEyvgOreL
* */

app.get('/', (req, res) => {
    res.json({
        ok: true,
        messsage: 'Hola Mundo!'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
