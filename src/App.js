import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Principal from './principal.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
  <MuiThemeProvider>
    <div id='app'>
        <Principal />
    </div>
  </MuiThemeProvider>
);

export default App;
