const   Validator = require('validator'),
        isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

//Convert empty fields to empty strings so we can use validator functions

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

//Email Checks
    if(Validator.isEmpty(data.email)){
        errors.email = ' Email field is required';
    } else if( !Validator.isEmail(data.email)) { 
        errors.email = ' Email is invalid'
    }

//Password Check
    if(Validator.isEmpty(data.password)){
        errors.password = ' Password field is required';
    }  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}