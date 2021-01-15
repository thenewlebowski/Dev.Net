import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './app.css';

//=========REDUX===========
import { Provider } from 'react-redux';
import store from './store';

//=========JWT-DECODE=======
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//========PARTIAL COMPONENTS=======
import Navbar from './Components/partials/Navbar/Navbar';
import Footer from './Components/partials/Footer/Footer';
import Flag   from './Components/partials/Flag/Flag.js'

//========AUTH COMPONENTS=======
import Signup from './Components/auth/Signup';
import Login from './Components/auth/Login';

//=======ROUTE COMPONENTS=======
import Homepage from './Components/homepage/Homepage';
import Profile from './Components/profile/Profile';

//Check for token to keep user logged in
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


function app() {
  return (
    <Provider store={ store }>
      <div className="app">
        <Router>
          <Navbar />
          <Flag   />
          <Switch>
            <Route path="/"             exact component={ Homepage } />
            <Route path="/p/:username"  exact component={ Profile } />
            {/* Auth Routes */}
            <Route path="/signup"       exact component={ Signup }/>
            <Route path="/login"        exact component={ Login }/>
            {/* {( window.origin + '/admin')} */}
            {/* <Route path="/admin"        exact component={ ()=> window.location = window.origin + '/admin' }/> */}
          </Switch>
          {/* <Footer params={window.location.pathname}/> */}
        </Router>
      </div>
    </Provider>
    
  );
}

export default app;
