const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require: true,
    },
    surname:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    img:{
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    role:{
        type: String,

    },password:{
        type: String,

    },
    google:{
        type: Boolean,
        default: false
    }
})

//Transform data to work, but the db is equal

UserSchema.method('toJSON',function(){
    const {__v, _id , password,  ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'User', UserSchema );
