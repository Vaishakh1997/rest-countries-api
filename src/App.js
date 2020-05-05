import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Details from './details';
import Home from './home';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Where in the world?</h1>
        <h5>Dark Mode</h5>
      </header>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:name" component={Details} />
      </Router>
    </div>
  );
}

export default App;

