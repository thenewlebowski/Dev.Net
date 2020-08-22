import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './Components/partials/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
      
    </div>
  );
}

export default App;
