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
  var reporte;
var p1=new Promise (
  function(resolve, reject){
  var refDB=ref.child("reportes/"+ nip);
  refDB.on('value', snapshot=>{
    resolve(reporte=snapshot.val().lugar);

  });
});
p1.then(
  function(val){
    alert(val);
  }
);
}
render(){
  return(
    <form onSubmit={this.revision}>
    <MuiThemeProvider>

    <div id='seguimiento'>
    <p>Coloca el <span>ID </span> de reporte</p>
    <AutoComplete
        hintText="Ex. 709237"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
      <div id='seguimiento-button'>
      <RaisedButton
      label=" Aceptar "
      onClick={this.revision}
      secondary={true}

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
