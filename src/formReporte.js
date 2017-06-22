import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import ReporteVoz from './reporteVoz.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './formReporte.css'


const styletext = {
    width: '70%',
};

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

      <div id='nuevo-general'>
        <div id='nuevo'>
        <p>REPORTE DE CASO,
        en este espacio puede reportar la situación detectada de prácticas que van en contra de nuestros principios
         y valores.</p>
         <li><Link to="/GrabarRepo">¿Prefiere grabar el reporte?</Link></li>
         <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4} style={styletext}/>
         <div id='nuevo-descripcion'>
          <p>Lugar donde se detectó la práctica</p>
          <AutoComplete
              hintText="Ex. Almacén"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              style={styletext}
            />
              <p>Personas involucradas</p>
            <AutoComplete
              hintText="Ex. Licenciado Raúl Lopez"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              style={styletext}
            />
          </div>
        </div>
      </div>

      </MuiThemeProvider>

    );
  }
}

export default Reporte;
