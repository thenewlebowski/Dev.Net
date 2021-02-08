import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER
} from './types';

//login user action
export const loginUser = (userData, history) => dispatch =>{
    axios.post(process.env.REACT_APP_PROXY + '/auth/login', userData )
        .then(res => {
            //set token and admin to local storage
            const { 
                token,
            } = res.data;
            localStorage.setItem('jwtToken', token);
            //set storage tokens
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            console.log(decoded);
            //dispatch to setCurrentUser function
            dispatch(setCurrentUser(decoded));
        })
        .then(res => history.push('/'))
        // .catch(err => dispatch(setFlagError(err.response.data.flag.err)));
        .catch(err => 
            console.log(err)
            // dispatch({
            //     type:GET_ERRORS,
            //     payload: err.response.data
            // }
        // )    
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