const { Schema, model} = require('mongoose');

const adminSchema = new Schema({
    permissions : {
        type     : Number,
        required : true,
        default  : 0,
    },
    posts : [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    email : {
        type     : String,
        required : true,
    },
    postReviews : [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    password : {
        type     : String, 
        required : true,
    },
    lastActive : {
        type     : Date,
        required : true,
        default  : Date.now(),
    },
    createdAt : {
        type     : Date,
        required : true,
        default  : Date.now()
    }
})

module.exports = Admin = model('Admin' , adminSchema)