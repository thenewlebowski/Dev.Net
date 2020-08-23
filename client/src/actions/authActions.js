import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER
} from './types';

export const registerUser = (userData, history) => dispatch => {
    console.log('register user')
    axios.post('/auth/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            }
        )
    )
}

export const loginUser = (userData, history) => dispatch =>{
    axios.post('/auth/login', userData )
        .then(res => {
            //set token to local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            //set token to auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            //dispatch to setCurrentUser function
            dispatch(setCurrentUser(decoded));
        })
        .then(res => history.push('/'))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            }
        )    
    )
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from local storage 
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to empty object {} which wil set id Authenticated to false
    dispatch(setCurrentUser({}));
}