const   Post   = require('../models/Post'),
        router = require('express').Router();

        router.route('/recent').get((req, res) => {
            Post.findOne({}).sort({createdAt : -1}).exec((err, post) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json(post.body[0]);
            })
        })

module.exports = router;

