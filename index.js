require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config')


//create express server
const app = express();
 
//Cors Config
app.use(cors());

//DB Connection
dbConnection();

//Routes 
app.get('/', (req,res)=>{
    res.json({
        ok:true,
        msg:'Hola mundo'
    })
})

app.listen( process.env.PORT, ()=>{
    console.log('Server running on port: ' + process.env.PORT);
});