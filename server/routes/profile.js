const   router      = require('express').Router();

// Load Models
const   Profile     = require('../models/Profile');

/**@route /api/profile/{id}
 * @desc Api to retreive the profile from request parameters
 * @author Colton Nielsen
 */
router.route('/:id').get((req, res) => {
    Profile.findById(req.params.id, (err, profile)=>{
        if(err){
            return res.status(400).json(err);
        }
        res.json(profile);
    });
})

//Get Profile Img /** This is only for a test */
router.route('/img').get((req, res) => {
    return res.sendFile('/profilePicture.jpg');
    res.sendFile('/profilePicture.jpg');
})


module.exports = router;