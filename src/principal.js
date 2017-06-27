import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Reporte from './formReporte.js';
import Seguimiento from './seguimiento.js';
import Lista from './listaStatus.js';
import ReporteVoz from './reporteVoz.js';
import {Switch} from 'react-router-dom'
import AppBarExampleIcon from './ActionBar.js';
import Main from './main.js'
import Admin from './admin.js'
import AdminList from './admin-list.js'
import Key from './admin-user.js'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main}/>
    <Route path="/seguimiento" component={Seguimiento}/>
    <Route path="/reporte_status" component={Lista}/>
    <Route path="/reporte" component={Reporte}/>
    <Route path="/GrabarRepo" component={ReporteVoz}/>
    <Route path="/administrador" component={Admin}/>
    <Route path="/administrador-list" component={AdminList}/>
    <Route path="/:key" component={Key}/>
  </Switch>
);

class Principal extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AppBarExampleIcon />
            <Routes />
          </div>
        </Router>
      </div>
    );
  }
}

export default Principal;
