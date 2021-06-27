const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String,
        // required:true
    },
    description:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
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

var Posts = mongoose.model('Post',postSchema);  // mongoose model created with collection  Posts

module.exports = Posts;