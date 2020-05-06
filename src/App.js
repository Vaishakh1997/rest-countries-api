import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Details from './details';
import Home from './home';
import Header from './header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:name" component={Details} />
      </Router>
    </div>
  );
}

export default App;

