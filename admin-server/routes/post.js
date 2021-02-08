/** |-----------------------------
 *  | Packages
 *  |-----------------------------
 *  | Here are the packages that 
 *  | we use for the corresponding
 *  | routes
 *  |-----------------------------
 */

const router   = require('express').Router(),
      decode   = require('jwt-decode'),
      mongoose = require('mongoose');

/** |-----------------------------
 *  | Models
 *  |-----------------------------
 *  | Here we import all the models
 *  | for the corresponding routes
 *  |----------------------------- 
 */
const Admin = require('../models/Admin'),
      Post  = require('../models/Post' );

/** |-----------------------------
 *  | Commands
 *  |-----------------------------
 *  | Here are some commands so 
 *  | that we can move the approved
 *  | posts over to the node db 
 *  |----------------------------- 
 */
const { uploadMongooseObj } = require('../commands/uploads');

/** |-----------------------------
 *  | Development Packages
 *  |-----------------------------
 *  | Not needed for deployment
 *  |----------------------------- 
 */    
// const jwt = require('jsonwebtoken')

/**
 * @route /api/admin/post/create
 * @param :jwt json web token -> decode -> user 
 * @returns boolean [whether or not the post was successfully saved]
 */
// Get all routes corrisponding to user
router.route('/create').post((req, res) => {
    //error handling if there is no auth header
    if(!req.headers.authorization) return res.status(403).json({err : "Authorization not accepted, please contact web admin." })
    //check user for admin status
    const jwt = decode(req.headers.authorization);
    // return res.json(jwt);
    Admin.findById(jwt.id, (err, admin) => {
        //error handling
        if(err || !admin) res.status(403).json({err : "There was an error processing your request."})
       
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
                 admin.posts.push(post._id);
                 admin.save();
                //assigns the post review to the admin with the least ammount of idle reviews
                Admin.find({})
                     .sort({postReviews : 1})
                     .exec( (err, admins) => {
                         admins[0].postReviews.push(post._id)
                         admins[0].save();
                     });
                     return res.status(200)
                               .json({response : 'Successfully created post and assigned review '})
             })
             .catch(err => console.log(err))
    })
})

router.route('/review').get((req, res) => {
    if(!req.headers.authorization) return res.status(403).json({error : "Authorization not accepted, please contact web admin." })
    //check user for admin status
    const jwt = decode(req.headers.authorization);
    Admin.findById(jwt.id, (err, admin)=> {
        if(err) return res.status(500).json({err : 'Internal Server Error'});
        //return all of the users postReviews
        admin.populate('postReviews', (err, review) => {
            if(err) return res.status(500).json({err : 'Internal Server Error'});
            return res.status(200).json({admin})
        });
    })
})

/**
 * Here we approve the post after reviewal 
 * We continue to move it over to the 
 * cryptnode database
 * 
 * @note is this something that we need to handle with a micro service 
 * or can we just use node to connect to a different database. It might 
 * be confusing to work on in the future if we have this submitted 
 * through node. 
 * 
 * @response For now lets just have node handle it and we can switch
 * it in the future if we desire to.
 * 
 * @param   admin
 * @param   post
 * @return  res
 * 
 */

router.route('/approve').post((req, res) => {
    if(!req.headers.authorization) return res.status(403).json({err : "No authorization provided please contact web admin to update your credentials" });
    const jwt = decode(req.headers.authorization);
    Admin.findById(jwt.id, (err, admin) => {
        if(err || !admin) return res.status(500).json(err);
        //find post
        //@todo probably could just .populate all of the reviews and .filter reviews by req.body.postId 
        Post.findByIdAndUpdate(req.body.postId, {approved: true}, {new:true}, (err, post) => {
            if(err) return res.status(500).json(err);
            //convert cursor to object
            post = post.toObject();
            //upload post to node database
            uploadMongooseObj(post, Post, true, (err, saved) => {
                if(err) return res.status(500).json(err);
                console.log('[Route:Post.js] Successfully saved to node database!')
                console.log(saved);
                return res.status(200).json(saved);
            });            
        })
    })
})

module.exports = router;