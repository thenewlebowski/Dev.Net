const   Validator = require('validator'),
        isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

//Convert empty fields to empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

//First name Check
    if(Validator.isEmpty(data.firstName)){
        errors.firstName = ' First Name is required';
    }

//Second name check
    if(Validator.isEmpty(data.lastName)){
        errors.lastName = ' Last Name is required';
    }

//Username Check
    if(Validator.isEmpty(data.username)){
        errors.username = ' Username is required';
    }

//Email Check
    if(Validator.isEmpty(data.email)){
        errors.email = ' Email field is required';
    } else if(!Validator.isEmail(data.email)){
        errors.email = ' Email is invalid';
    }

//Password Checks
    //Check if password is empty
    if(Validator.isEmpty(data.password)){
        errors.password = ' Password field is required';
    }
    //Check if password2 is empty
    if(Validator.isEmpty(data.password2)){
        errors.password2 = ' Confirm Password field is required';
    }
    //Check if password is the correct length
    if(!Validator.isLength(data.password, {min:6, max: 30})){
        errors.password = ' Password must be at least 6 characters';
    }
    //Check if passwords match
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = ' Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}