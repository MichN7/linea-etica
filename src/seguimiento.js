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
   direccion:'/seguimiento'
 };

 handleUpdateInput = (value) => {
   this.setState({
     dataSource: [
       value
     ],
   });
 };
revision=()=>{
  let self=this;
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
    if(val==null){
      alert('nip incorrecto');
    }
    else{
    self.setState({
      direccion:'/lista'
    });
    }
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
      <Link to= {{
        pathname: this.state.direccion,
        state: { nip: this.state.dataSource }
      }}>
      <div id='seguimiento-button'>
      <RaisedButton
      label=" Aceptar "
      onClick={this.revision}
      secondary={true}

    />
    </div>
    </Link>
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
