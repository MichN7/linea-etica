import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import ReporteVoz from './reporteVoz.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';


class Reporte extends Component {
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
  render() {
    return (

      <MuiThemeProvider>

      <div>
      <li><Link to="/GrabarRepo">Grabar reporte</Link></li>

      <p>REPORTE DE CASO,
      en este espacio puede reportar la situación detectada de prácticas que van en contra de nuestros principios
       y valores.</p>
        <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4}/>
      <p>Lugar donde se detectó la práctica</p>
      <AutoComplete
          hintText="ejemplo almacen"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />
          <p>Personas involucradas</p>
        <AutoComplete
          hintText="ejemplo Lic Dominguez"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />

      </div>

      </MuiThemeProvider>

    );
  }
}

export default Reporte;
