const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try { 
        //poT1whIn8hgX7Xtr 
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error to connect DB server')
    }
}

module.exports = { dbConnection }