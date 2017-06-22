import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

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
revision=()=>{
  
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
