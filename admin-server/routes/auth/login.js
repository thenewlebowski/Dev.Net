let express = require('express');
let bcrypt = require('bcrypt');
let router = express.Router();
const jwt = require('jsonwebtoken')

//Load input validation
const   validateLoginInput    = require('../../validation/auth/login');

//Load Models
const   Admin = require('../../models/Admin');        

/**
  *@route POST api/auth/login
  *@desc Login and return JWT token
  *@access Public
  */

 router.route('/login').post((req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

//Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const   email    = req.body.email,
            password = req.body.password;

//Find user by email
    Admin.findOne({ email }).then(user => {
    // Check if user exist
        if(!user){
            return res.status(404).json({flag: {err: 'Incorrect email or password try again or reset your password'}});
        }
    //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                //User matched
                //Create JWT Payload        
                const payload = {
                    permissions : user.permissions,
                    lastActive  : user.lastActive,
                    createdAt   : user.createdAt,
                    email       : user.email,
                    id          : user.id,
                }

                //Sign token
                jwt.sign(
                    payload,
                    process.env.PASSPORT_KEY,
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        
                        token = 'Bearer ' + token;
                        res.json({
                            success: true,
                            token:   token,
                        });
                    }
                );
            } else {
                return res.status(404).json({flag: {err: 'Incorrect email or password try again or reset your password'}});
            }
        });
    });
});

module.exports = router;