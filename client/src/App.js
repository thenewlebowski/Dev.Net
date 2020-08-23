import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

/**
 * Import components
 * @void
 */
import Navbar from './Components/partials/navbar/navbar';

/**
 * Import authentication routes
 * @void
 */
import Signup from './Components/auth/signup/signup';
import Login from './Components/auth/login/login';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          {/* Auth Routes */}
          <Route path="/signup" component={ Signup }/>
          <Route path="/login" component={ Login }/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
