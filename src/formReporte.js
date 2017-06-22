import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import ReporteVoz from './reporteVoz.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import { ref } from './const.js'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
var id = require('shortid');

class Reporte extends Component {
  constructor(){
    super()
  this.state = {
    dataLugar: [],
    dataPersonas:[],
    open:false,
    id:'0'
 };


 }
 componentWillMount(){
   var idReporte=id.generate();
   this.setState({
     id:idReporte
   });
 }
 subirDatos =()=>{

  var refDB=ref.child("reportesEscritos");
    var refSubir=refDB.push();
    refSubir.set({
      caso:`${this.state.caso}`,
      lugar:`${this.state.dataLugar}`,
      persona:`${this.state.dataPersonas}`,
      id:`${this.state.id}`
    });
    this.handleOpen();

};

 handleUpdateInputLugar = (value) => {

   this.setState({
     dataLugar: [
       value
     ]
   });

 };
 handleUpdateInputPersonas = (value) => {

   this.setState({
     dataPersonas: [
       value
     ]
   });

 };
handleChangeNotas = (event) => {

   this.setState({
     caso:event.target.value
   });

 };
 handleOpen = () => {
     this.setState({open: true});
   };
 handleClose = () => {
     this.setState({open: false});
   };

   render() {
     const actions = [

       <FlatButton
         label="Cancel"
          onClick={this.handleClose}
         primary={true}
       />


     ];
    return (
      <form onSubmit={this.subirDatos}>
      <MuiThemeProvider>
      <div>
      <li><Link to="/GrabarRepo">Grabar reporte</Link></li>
      <p>REPORTE DE CASO,
      en este espacio puede reportar la situación detectada de prácticas que van en contra de nuestros principios
       y valores.</p>
       <div>
        <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4}
         value={this.state.caso}
         onChange={this.handleChangeNotas}
         />
        </div>
      <p>Lugar donde se detectó la práctica</p>
      <AutoComplete
          hintText="ejemplo almacen"
          dataSource={this.state.dataLugar}
          onUpdateInput={this.handleUpdateInputLugar}
        />
          <p>Personas involucradas</p>
        <AutoComplete
          hintText="ejemplo Lic Dominguez"
          dataSource={this.state.dataPersonas}
          onUpdateInput={this.handleUpdateInputPersonas}
        />

        <RaisedButton
        label=" Enviar "
        type="submit"
        secondary={true}
      />
      <Dialog
         title="Dialog With Actions"
         actions={actions}
         modal={false}
         open={this.state.open}

       >
         El reporte fue enviado, para darle seguimiento conserva este código : {this.state.id}
       </Dialog>
      </div>

      </MuiThemeProvider>
      </form>

    );
  }
}

export default Reporte;
