import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './seguimiento.css';

const style = {
  margin: 12,
};

class Seguimiento extends Component{
  state = {
   dataSource: [],
 };

 handleUpdateInput = (value) => {
   this.setState({
     dataSource: [
       value,
       value + value,
       value + value + value,
     ],
   });
 };
render(){
  return(
    <MuiThemeProvider>
      <div id='seguimiento'>
        <p>Escribe el ID de reporte</p>
        <AutoComplete
            hintText="Ex. 142373"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
          />
          <div id='seguimiento-button'>
            <RaisedButton
            href="/reporte_status"
            target="_self"
            label=" Aceptar "
            primary={true} />
          </div>
          <div id='seguimiento-link'>
            <Link to="/reporte" >¿Nuevo reporte?</Link>
          </div>
      </div>
    </MuiThemeProvider>

  );
}
}
export default Seguimiento;
