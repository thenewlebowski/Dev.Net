import { HashRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from "./utils/PrivateRoute";
import Login from './views/auth/login';
import checkJWT from './checkJWT';
import React from 'react';
import './App.css';

import './scss/style.scss';

const Layout = React.lazy(() => import('./containers/Layout'));

function App() {

  //check if jwt exists 
  checkJWT();

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  return (
    <div className="app">
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route path="/login" exact name="Login" render={props => <Login /> } />
              <PrivateRoute path = "/" name="PrivateRoute" component={props => <Layout {...props} /> } />
            </Switch>
     </React.Suspense>
     </HashRouter>
    </div>
  );
}

export default App;
