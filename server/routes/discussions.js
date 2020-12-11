// Require express router
const   router      = require('express').Router();

// Load models
const   Discussion  = require('../models/Discussion');


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

/**
 * @route /api/discussion/create
 * @note gave a flag to url in place of all
 * @param :user user id
 * @returns all discussion of given user
 */
// Get all routes corrisponding to user
router.route('/create').post((req, res) => {
    process.env.ENV !== "production" ? console.log('[Discussion Route] ' + req.params.discussion) : null;
    return res.status(200).json({flag: {success: '[Discussion] Dicussion create route hit!'}});
})

module.exports = router;


