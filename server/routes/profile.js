const   router      = require('express').Router();

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
        if(err)         return process.env.ENV !== "production" ? res.status(400).json({err: err}) : res.status(404).json({err: "User not found"}); 
        
        //Checks if mongoose returns nothing return a 404 not found error
        if(!user)    return res.status(404).json({err : "User not found"});
        
        Profile.findOne({_id : user.profile.id }, (err, profile)=>{
            //Checks if mongoose returns an error if so also check if in production and respond accordingly
            if(err)         return process.env.ENV !== "production" ? res.status(400).json({err: err}) : res.status(404).json({err: "Profile not found"}); 

            //Checks if mongoose returns nothing return a 404 not found error
            if(!profile)    return res.status(404).json({err : "Profile not found"});          
            
            return res.json(profile);
        })
    });
})

/**@route /api/p/edit
 * @desc Api to edit profile based off of currently signed in user
 * @author Colton Nielsen
 */
router.route('/edit').post((req, res) => {
    process.env.ENV !== "production" ? console.log('[Profile Route] ' + req.params.username) : null;
    console.log(req);
})

//Get Profile Img /** This is only for a test */
router.route('/img').get((req, res) => {
    return res.sendFile('/profilePicture.jpg');
    res.sendFile('/profilePicture.jpg');
})


module.exports = router;