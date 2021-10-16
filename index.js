require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')

//create express server
const app = express();
 
//Cors Config
app.use(cors());

//Read and Parser body data
app.use( express.json() )

//DB Connection
dbConnection();

//Routes 
app.use('/api/users', require('./routes/users') );
app.use('/api/login', require('./routes/auth') );

app.listen( process.env.PORT, ()=>{
    console.log('Server running on port: ' + process.env.PORT);
});