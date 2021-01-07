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

/*Direct Public*/
app.use(express.static('public'));

//Routing
app.use('/api/users', require('./routes/user.routers'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals.routers'));
app.use('/api/doctors', require('./routes/doctors.routers'));
app.use('/api/search', require('./routes/search.routers'));
app.use('/api/upload', require('./routes/uploads.routers'));

/*
* user: main_user
* pass: FpD1Dg8cEyvgOreL
* */

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
