//import types
import {
    FLAG_SUCCESS,
    FLAG_ERROR
} from './types';

//set flag state to success
export const setFlagSuccess = data => {
    return {
        type    : FLAG_SUCCESS,
        payload : data
    }
}

//set flag state to error
export const setFlagError = data => {
    return {
        type    : FLAG_ERROR,
        payload : data
    }
}