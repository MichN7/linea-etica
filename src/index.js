import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

import { BrowserRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Main = () =>(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

const WithRouter = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
ReactDOM.render(<WithRouter />, document.getElementById('root'));
