const   mongoose = require('mongoose'),
        Schema   = mongoose.Schema;


const profileSchema = new Schema({
   bio: {
       type: String,
       default: '',
       required: false,
   },
   langs: {
        type: Schema.Types.Mixed,
        default: [],
        required: false,
   },
   user : {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username : {
            type: String, 
            required: true
        }
   }

})

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;