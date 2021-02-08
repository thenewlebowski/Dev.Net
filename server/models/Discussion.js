const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const   discussionSchema = new Schema({
    user : { 
        id: {
            type: Schema.Types.ObjectId,
            required : true,
            ref: 'User',
        },
        username : {
            type: String, 
            required: true
        }
    },
    title : {
        type: String,
        required: true,
    },
    body : {
        type: String,
        required: true,
    },
    tags : {
        type : Array,
        required : false,
    }
})

module.exports = Discussion = mongoose.model('Discussion', discussionSchema)
