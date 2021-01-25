import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//Check for token to keep user logged in
const checkJWT = () => {
    if(localStorage.jwtToken){
        const token = localStorage.jwtToken;
        setAuthToken(token);
        //Decode token and get user info and exp
        const decoded = jwt_decode(token);
        //Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        //Check for expired token
        const currentTime = Date.now() / 1000; //to get in milliseconds
        if(decoded.exp < currentTime) {
            //Logout user
            store.dispatch(logoutUser());
            //Redirect to login
            window.location.href = './login';
        }
    }
}

export default checkJWT;