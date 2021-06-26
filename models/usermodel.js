const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
        }
    }
});

var Users = mongoose.model('User',userSchema);  // mongoose model created with collection Users

module.exports = Users;