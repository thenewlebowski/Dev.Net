const   router      = require('express').Router(),
        decode  = require('jwt-decode');

// Load Models
const   Profile     = require('../models/Profile');
const   User        = require('../models/User');

/**@route /api/p/{id}
 * @desc Api to retreive the profile from request parameters
 * @author Colton Nielsen
 */
router.route('/:username').get((req, res) => {
    process.env.ENV !== "production" ? console.log('[Profile Route] ' + req.params.username) : null;
    User.findOne({ username : req.params.username }, (err, user)=>{
        //Checks if mongoose returns an error if so also check if in production and respond accordingly
        if(err)  return process.env.ENV !== "production" ? res.status(400).json({err: err}) : res.status(404).json({err: "User not found"}); 
        
        //Checks if mongoose returns nothing return a 404 not found error
        if(!user)  return res.status(404).json({err : "User not found"});
        
        Profile.findOne({_id : user.profile.id }, (err, profile)=>{
            //Checks if mongoose returns an error if so also check if in production and respond accordingly
            if(err) return process.env.ENV !== "production" ? res.status(400).json({err: err}) : res.status(404).json({err: "Profile not found"}); 

            //Checks if mongoose returns nothing return a 404 not found error
            if(!profile) return res.status(404).json({err : "Profile not found"});          
            
            return res.json(profile);
        })
    });
})

/**@route /api/p/edit
 * @desc Api to edit profile based off of currently signed in user
 * @author Colton Nielsen
 */
router.route('/edit').post((req, res) => {
    // return res.status(404).json({flag: {err: 'Need to set this path to work with JWT verification sooner then later'}});
    //Find user by decoded jwt
    let jwt = decode(req.headers.authorization);
    User.findByOne( {user: { id : jwt.id }} , (err, prf)=>{
        return console.log(prf);
        //Checks if mongoose returns an error if so also check if in production and respond accordingly
        if(err)         return process.env.ENV !== "production" ? res.status(400).json({flag: {err: err}}) : res.status(404).json({flag: {error: "There was an error trying to process your request. Please try again later"}});

        if(!user)       return res.status(400).json({err: "You are not the owner of this account. If you think you are getting this message by mistake please contact our customer service."});

        //find profile so we can save user changes to it
        Profile.findOne({   _id: user.profile.id    }, ( err, profile ) => {
            //Checks if mongoose returns an error if so also check if in production and respond accordingly
            if(err)         return process.env.ENV !== "production" ? res.status(400).json({err:    {mongoose: err}}) : res.status(404).json({err: {mongoose:"There was an error trying to process your request. Please try again later"}});
            
            //Set database to req variables & save
            profile.bio     = req.body.bio;
            profile.langs   = req.body.langs;
            profile.save();

            //return status
            return res.status(200).json({flag : {success: 'Profile successfully updated'}});
        })
    })
})

//Get Profile Img /** This is only for a test */
router.route('/img').get((req, res) => {
    return res.sendFile('/profilePicture.jpg');
    res.sendFile('/profilePicture.jpg');
})


module.exports = router;