import React from 'react';
import './assets/App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Details from './components/details';
import Home from './components/home';
import Header from './components/header';

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

