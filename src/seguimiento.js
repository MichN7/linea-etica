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
render(){
  return(
    <MuiThemeProvider>
    <div>
    <p>Coloca el ID de reporte</p>
    <AutoComplete
        hintText="ejemplo 4135"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
      <RaisedButton
      href="/reporte_status"
      target="_self"
      label=" Aceptar "
      secondary={true}

    />
    <a><p>¿Nuevo reporte?</p></a>

    </div>
    </MuiThemeProvider>

  );
}
}
export default Seguimiento;
