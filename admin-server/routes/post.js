/** |-----------------------------
 *  | Packages
 *  |-----------------------------
 *  | Here are the packages that 
 *  | we use for the corresponding
 *  | routes
 *  |-----------------------------
 */

const router = require('express').Router();
const decode  = require('jwt-decode');

/** |-----------------------------
 *  | Models
 *  |-----------------------------
 *  | Here we import all the models
 *  | for the corresponding routes
 *  |----------------------------- 
 */
const Admin = require('../models/Admin'),
      Post  = require('../models/Post' );   

/**
 * @route /api/admin/post/create
 * @param :jwt json web token -> decode -> user 
 * @returns boolean [whether or not the post was successfully saved]
 */
// Get all routes corrisponding to user
router.route('/create').post((req, res) => {
    //error handling if there is no auth header
    if(!req.headers.authorization) return res.status(403).json({error : "Authorization not accepted, please contact web admin." })
    //check user for admin proof
    const jwt = decode(req.headers.authorization);
    // return res.json(jwt);
    Admin.findById(jwt.id, (err, admin) => {
        //error handling
        if(err) res.status(403).json({error : "There was an error processing your request."})
       
        const newPost = new Post({
            tags  : req.body.tags,
            date  : req.body.date,
            body  : req.body.body,
            title : req.body.title,
            //todo need to change this to name instead of email
            author : jwt.email,
        });
        newPost.save()
             .then(post => {
                //assigns the post review to the admin with the least ammount of idle reviews
                Admin.find({})
                     .sort({postReviews : 1})
                     .exec( (err, admins) => admins[0].postReviews.push(post._id));
                     return res.status(200)
                               .json({response : 'Successfully created post and assigned review '})
             })
             .catch(err => console.log(err))


        return res.json(admin);
    })
    // console.log(jwt);
    // res.json({response: 'hit route'});
})


module.exports = router;