import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Principal from './principal.js';

class App extends Component {
  render() {
    return (
      <div>
      <Principal/>

      </div>
    );
  }
}

export default App;
