const mongoose = require('mongoose');

/**
 * @description uploads object to node database
 * @param       {mongoose.object} post
 * @param       {mongoose.model}  model
 * @param       {boolean}         del
 * @param       {callback}        cb
 * @return      void 
 */
const uploadMongooseObj = ( object, model, del = false, cb = false) => {
    const mongooseOpt = {
        useNewUrlParser     : true,
        useUnifiedTopology  : true,
        useFindAndModify    : false,
    };

    mongoose.disconnect();
    mongoose.connect(process.env.NODE_MONGODB_URI, mongooseOpt);
    mongoose.connection.once('open', () => {
        console.log('Uploading post to node database...');
        //if old model delete and upload new one
        if(del) model.findByIdAndDelete(object._id, () => console.log('Successfully deleted object id ' + object._id ))
        model.create(object, (err, saved) => {
            if(err) console.log(err)
            saved = saved.toObject();
            //callback function
            if(typeof cb === "function") cb(err, saved);
            console.log('Disconnecting from Node DB and reconnecting to Admin DB');
            mongoose.disconnect()
            mongoose.connect(process.env.ADMIN_MONGODB_URI, mongooseOpt)
            mongoose.connection.once('open', () => {
               console.log('Successfully connected to Admin DB');
            })
        });
        
    })

    
}

module.exports = { uploadMongooseObj }

