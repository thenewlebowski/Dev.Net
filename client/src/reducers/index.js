import { combineReducers } from 'redux';
import authReducers from './authReducers';
import errReducers from './errReducers';

export default combineReducers({
    auth: authReducers,
    errors: errReducers
})