const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName :{
        type: String,
        default: 'none',
        required: true

    },
    imageData : {
        type: String,
        required: true
    }
})

const Image = mongoose.model('Image', ImageSchema)

export default Image;