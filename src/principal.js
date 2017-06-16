import React, { Component } from 'react';
import AppBarExampleIcon from './ActionBar.js';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Reporte from './formReporte.js';
import Seguimiento from './seguimiento.js';
import Lista from './listaStatus.js';
class Principal extends Component {
  render() {
    return (
      <div>
        <AppBarExampleIcon/>
        <Router>
          <div>
          <li><Link to="/seguimiento">Dar seguimiento a reporte</Link></li>
          <li><Link to="/reporte" >Nuevo reporte</Link></li>

          <Route path="/seguimiento" component={Seguimiento}/>
          <Route path="/reporte_status" component={Lista}/>
          <Route path="/reporte" component={Reporte}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default Principal;
