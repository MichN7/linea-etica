import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './seguimiento.css';
import { ref } from './const.js'

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
       value
     ],
   });
 };
revision=()=>{
  var nip=this.state.dataSource;
  var refDB=ref.child("reportes/"+ nip);
  refDB.on('value', snapshot=>{
    var reporte=snapshot.val().lugar;

  });
  alert(this.reporte);
}
render(){
  return(
    <form onSubmit={this.revision}>
    <MuiThemeProvider>

    <div id='seguimiento'>
    <p>Coloca el ID de reporte</p>
    <AutoComplete
        hintText="ejemplo 4135"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
      <div id='seguimiento-button'>
      <RaisedButton
      label=" Aceptar "
      type="onSubmit"
      secondary={true}
      href="/reporte_status"
    />
    </div>
    <div id='seguimiento-link'>
      <Link to="/reporte" >¿Nuevo reporte?</Link>
    </div>

    </div>
    </MuiThemeProvider>
    </form>
  );
}
}
export default Seguimiento;
