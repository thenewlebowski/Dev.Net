import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//=========REDUX===========
import { Provider } from 'react-redux';
import store from './store';

//=========JWT-DECODE=======
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//========PARTIAL COMPONENTS=======
import Navbar from './Components/partials/navbar/navbar';

//========AUTH COMPONENTS=======
import Signup from './Components/auth/signup';
import Login from './Components/auth/login';

//=======USER COMPONENTS=======
import Profile from './Components/profile/profile';

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


function App() {
  return (
    <Provider store={ store }>
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            {/* Auth Routes */}
            <Route path="/signup" component={ Signup }/>
            <Route path="/login" component={ Login }/>
            <Route path="/profile" component={ Profile } />
          </Switch>
        </Router>
      </div>
    </Provider>
    
  );
}

export default App;
