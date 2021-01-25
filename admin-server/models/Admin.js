const { Schema, model} = require('mongoose');

const adminSchema = new Schema({
    permissions : {
        type     : Number,
        required : true,
        default  : 0,
    },
    posts : {
        type: Schema.Types.ObjectId,
        ref: 'posts',
    },
    email : {
        type     : String,
        required : true,
        // unique : true,
    },
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

module.exports = Admin = model('admins' , adminSchema)