import { combineReducers } from 'redux';
import authReducers from './authReducers';
import flagReducers from './flagReducers';
import errReducers  from './errReducers';

export default combineReducers({
    errors: errReducers,
    auth: authReducers,
    flag: flagReducers,
})