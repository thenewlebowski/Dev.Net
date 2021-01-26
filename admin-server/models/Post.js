const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const   postSchema = new Schema({
    date : {
        type     : String,
        required : true,
    },
    body : {
        type     : Array,
        required : true,
    },
    tags : {
        type     : Array,
        required : false,
    },
    title : {
        type     : String,
        required : true,
    },
    author : {
        type     : String,
        required : true,
    },
    createdAt : {
        type     : Date,
        required : true,
        default  : Date.now(),
    },
    updatedAt : {
        //@todo need to add the ability to 
        //record changes and who the change was made by
        type     : Date,
        required : true,
        default  : Date.now(),
    },
    authorized : {
        required : true,
        default  : false,
        type     : String,
    },
    //here is where we assign the post review to another admin
    reviewer : {

    }
})

module.exports = Post = mongoose.model('posts', postSchema)


