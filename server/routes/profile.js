const   router      = require('express').Router();

// Load Models
const   Profile     = require('../models/Profile');
const   User        = require('../models/User');

/**@route /api/profile/{id}
 * @desc Api to retreive the profile from request parameters
 * @author Colton Nielsen
 */
router.route('/:username').get((req, res) => {
    process.env.ENV !== "Production" ? console.log('[Profile Route] ' + req.params.username) : null;

    User.findOne({ username : req.params.username }, (err, user)=>{
        if(err)
        {
            console.log(err);
            return res.status(400).json({err : error});
        }
        console.log(user.profile);
        Profile.findOne({_id : user.profile.id }, (err, profile)=>{
            if(err)
            {
                console.log(err);
                return res.status(400).json({err : error});
            }
            res.json(profile);
        })
    });
})

//Get Profile Img /** This is only for a test */
router.route('/img').get((req, res) => {
    return res.sendFile('/profilePicture.jpg');
    res.sendFile('/profilePicture.jpg');
})


module.exports = router;