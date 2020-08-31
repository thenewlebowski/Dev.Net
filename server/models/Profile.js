const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;


const profileSchema = new Schema({
   bio: {
       type: String,
       required: true,
       default: 'Please add a short autobiography.'
   },
   lang: {
        type: Schema.Types.Mixed,
        default: null,
        required: false,
   },
   descussions: {
       id: {
            type: Schema.Types.ObjectId,
            ref: 'descussion'
        },
        required : false
    },
   user : {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username : {
            type: String, 
            required: true
        }
   }

})

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;