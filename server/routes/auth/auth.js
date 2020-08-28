const   router = require('express').Router(),
        jwt = require('jsonwebtoken'),   
        bcrypt = require('bcrypt');

        
//Load input validation
const   validateRegisterInput = require('../../validation/auth/register'),
        validateLoginInput = require('../../validation/auth/login');

//Load Models
const   User    = require('../../models/User'),
        Profile = require('../../models/Profile');

//@route POST api/users/register
//@desc Register user
//@access Public

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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
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

//@route POST api/users/login
//@desc Login and return JWT token
//@access Public

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
            return res.status(404).json({ emailnotfound: 'Email not found'})
        }
    //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
            //User matched
            //Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
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
                    .json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;