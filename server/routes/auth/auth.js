const   router = require('express').Router(),
        jwt = require('jsonwebtoken'),   
        bcrypt = require('bcrypt');

        
//Load input validation
const   validateRegisterInput = require('../../validation/auth/register'),
        validateLoginInput = require('../../validation/auth/login');

//Load Models
const   User    = require('../../models/User'),
        Profile = require('../../models/Profile');

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
 */

router.route('/register').post((req, res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);
//Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if(user){
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            newUser = new User({
                firstName:  req.body.firstName,
                lastName:   req.body.lastName,
                username:   req.body.username,
                password:   req.body.password,
                email:      req.body.email,
            });
            
            //Create profile while creating user
            newProfile = new Profile({
                user: {
                    id: newUser.id,
                    username: newUser.username
                }
            })
            newProfile.save();
            newUser.profile.id = newProfile.id;
            
        //Hash password before saving it to database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.status(200).json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

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

    const   email = req.body.email,
            password = req.body.password;

//Find user by email
    User.findOne({ email }).then(user => {
    // Check if user exist
        if(!user){
            return res.status(404).json({ emailNotFound: 'Email not found'})
        }

        console.log(user);
    //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
            //User matched
            //Create JWT Payload
                const payload = {
                    firstName:  user.firstName,
                    username:   user.username,
                    lastName:   user.lastName,
                    isAdmin:    user.isAdmin,
                    id:         user.id,
                }

            //Sign token
                jwt.sign(
                    payload,
                    process.env.PASSPORT_KEY,
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordIncorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;