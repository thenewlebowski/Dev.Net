
const   mongoose = require('mongoose'),
Schema = mongoose.Schema;

//CREATE SCHEMA
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    profile: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        }
    },
    discussions : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Discussion',
        }
    ],
    isAdmin : {
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = User = mongoose.model('User', userSchema);