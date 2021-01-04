const express = require('express');
const cors = require('cors')
// Var Globals Entorno
require('dotenv').config();
const { dbConneccion } = require('./database/config');
const app = express();

const port = process.env.PORT;

/*Config Cors*/
app.use(cors());

/*Read and Parse the body*/
app.use(express.json());

/*DB Connections*/
dbConneccion();

app.use('/api/users', require('./routes/user.routers'));
app.use('/api/login', require('./routes/auth'))

/*
* user: main_user
* pass: FpD1Dg8cEyvgOreL
* */

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
