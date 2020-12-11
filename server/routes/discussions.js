// Require express router
const   router      = require('express').Router();

// Load models
const   Discussion  = require('../models/Discussion'),
        User        = require('../models/User');

/**
 * @route /api/discussion/create
 * @note gave a flag to url in place of all
 * @param :user user id
 * @returns all discussion of given user
 */
// Get all routes corrisponding to user
router.route('/create').post((req, res) => {
    process.env.ENV !== "production" ? console.log('[Discussion Route] Discussion created') : null;

    //[Note] add check for pre-existing tags
    // return res.status(200).json({params : req.params, body : req.body, headers : req.headers});

    //find user by authorization header
    User.findOne({  token: req.headers.authorization }, (err, user)=>{
        if(err)         return process.env.ENV !== "production" ? res.status(400).json({flag: {err: err}}) : res.status(404).json({flag: {error: "There was an error trying to process your request. Please try again later"}});

    if(!user)       return res.status(400).json({flag : {err: "No linked account was found. If you think you are getting this message by mistake please contact our customer service."}});

        //[Note] check for empty forms on client side
        //[Note] check for duplicate discussions by user

        newDiscussion = new Discussion({
            user  : {
                id       : user._id,
                username : user.username,
            },
            title : req.body.title,
            body  : req.body.body,
            tags  : req.body.tags
        });

        user.discussions = [
            ...user.discussions,
            { _id : newDiscussion._id }
        ]
        //save user and discussion
        user.save();
        newDiscussion.save();
        
        return res.status(200).json({flag: {success: "Successfully started discussion read it here >>> " }}); //[Note] add specific discussion route
    });

    
})


//Define routes

/**
 * @route /api/discussion/:discussion
 * @param :discussion discussion id
 * @returns corrisponding discussion
 */
//Get specific route
router.route('/:discussion').get((req, res) => {
    process.env.ENV !== "production" ? console.log('[Discussion Route] ' + req.params.discussion) : null;
    return res.status(404).json({flag: {success: '[Discussion] Dicussion specific route hit!'}});
})

/**
 * @route /api/discussion/a/:user
 * @note gave a flag to url in place of all
 * @param :user user id
 * @returns all discussion of given user
 */
// Get all routes corrisponding to user if
router.route('/a/:user').get((req, res) => {
    process.env.ENV !== "production" ? console.log('[Discussion Route] ' + req.params.discussion) : null;
    return res.status(404).json({flag: {success: '[Discussion] Dicussion all route hit!'}});

    return res()
})


module.exports = router;


