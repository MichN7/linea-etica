import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import ReporteVoz from './reporteVoz.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './formReporte.css'
import { ref } from './const.js'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
var id = require('shortid');

const styletext = {
    width: '70%',
};

class Reporte extends Component {
  constructor(){
    super()
  this.state = {
    dataLugar: [],
    dataPersonas:[],
    id:'0'
 };


 }
 componentWillMount(){
   var idReporte=id.generate();
   this.setState({
     id:idReporte,
     open:false
   });
 }
 subirDatos =()=>{

  var refDB=ref.child("reportes/" +`${this.state.id}`);
    refDB.set({
      caso:`${this.state.caso}`,
      lugar:`${this.state.dataLugar}`,
      persona:`${this.state.dataPersonas}`,
    }),


  this.setState({
    open: true
  });

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
      <div id='nuevo'>

      <Dialog
         title="Dialog With Actions"
         actions={actions}
        onRequestClose={this.handleClose}
         open={this.state.open}
       >
       El reporte fue enviado, para darle seguimiento conserva este código : {this.state.id}
     </Dialog>
      <p>REPORTE DE CASO,
      en este espacio puede reportar la situación detectada de prácticas que van en contra de nuestros principios
       y valores.</p>
         <Link to="/GrabarRepo">¿Prefiere grabar el reporte?</Link>
       <div>
         <p>Describe brevemente lo ocurrido</p>
        <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4}
         value={this.state.caso}
         onChange={this.handleChangeNotas}
         />
        </div>
      <p>Lugar donde se detectó la práctica</p>
      <AutoComplete
          hintText="Ex. Almacén"
          dataSource={this.state.dataLugar}
          onUpdateInput={this.handleUpdateInputLugar}
        />
          <p>Personas involucradas</p>
        <AutoComplete
          hintText="Ex. Licenciado Alberto Diaz"
          dataSource={this.state.dataPersonas}
          onUpdateInput={this.handleUpdateInputPersonas}
        />
        <div>
          <RaisedButton
          label=" Enviar "
          type="submit"
          secondary={true}
          />
        </div>
      </div>
      </form>

    );
  }
}

export default Reporte;
