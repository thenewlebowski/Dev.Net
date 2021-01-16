import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { Dashboard } from './views/index';
import './scss/style.scss';

const Layout = React.lazy(() => import('./containers/Layout'));

function App() {

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
              <Route path="/" name="Home" render={props => <Layout {...props}/>} />
              {/* <Route path="/" name="Home" render={props => <Dashboard {...props}/>} /> */}
            </Switch>
     </React.Suspense>
     </HashRouter>
    </div>
  );
}

export default App;
