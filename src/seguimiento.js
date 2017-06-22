import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
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
    <div>
    <p>Coloca el ID de reporte</p>
    <AutoComplete
        hintText="ejemplo 4135"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
      <RaisedButton
      label=" Aceptar "
      type="onSubmit"
      secondary={true}
    />
    <a><p>¿Nuevo reporte?</p></a>

    </div>
    </MuiThemeProvider>
    </form>
  );
}
}
export default Seguimiento;
