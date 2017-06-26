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
import DatePicker from 'material-ui/DatePicker';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
var id = require('shortid');

const styletext = {
    width: '70%',
};

class Reporte extends Component {
  constructor(){
    super()
    let self = this;
  this.state = {
    dataLugar: [],
    dataPersonas:[],
    dataHora:[],
    dataDia:[],
    radioVal: null,
    id:'0'
 };


 }
 componentWillMount(){
   var idReporte=id.generate();
   this.setState({
     id:idReporte,
     open:false,
     radio: false,
     radioT:false
   });
 }
 subirDatos =()=>{

  var refDB=ref.child("reportes/" +`${this.state.id}`);
    refDB.set({
      caso:`${this.state.caso}`,
      lugar:`${this.state.dataLugar}`,
      persona:`${this.state.dataPersonas}`,
      hora:`${this.state.dataHora}`,
      dia:`${this.state.dataDia}`,
      radio: `${this.state.radioVal}`
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
 handleUpdateInputDia = (value) => {
   alert(value);
   this.setState({
     dataDia: [
       value
     ]
   });
 };
 handleUpdateInputHora = (value) => {

   this.setState({
     dataHora: [
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

   setFechaDesde(x,event){
        alert(JSON.stringify(event));
        alert(JSON.stringify(x));
    }

   getValue = (e) =>{
     let value = e.target.value;
     if(value === "Sí"){
       this.setState({
         radio:true,
         radioT:false,
         radioVal:value
       })
     }
     else if(value === "No"){
       this.setState({
         radio:false,
         radioT:true,
         radioVal:value
       })
     }

   }
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
      en este espacio puedes reportar la situación detectada de prácticas que van en contra de nuestros principios
       y valores.</p>
         <Link to="/GrabarRepo">¿Prefieres grabar el reporte?</Link>
       <div>
         <p>Describe brevemente lo ocurrido</p>
        <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4}
         value={this.state.caso}
         onChange={this.handleChangeNotas}
         />
        </div>
        <p>¿En donde fue lo ocurrido?</p>
        <AutoComplete
            hintText="Ex. Almacén"
            dataSource={this.state.dataLugar}
            onUpdateInput={this.handleUpdateInputLugar}
          />
          <p>¿A que hora sucedió?</p>
          <AutoComplete
              hintText="Ex. 3:00 pm"
              dataSource={this.state.dataHora}
              onUpdateInput={this.handleUpdateInputHora}
          />
            <p>¿En que día?</p>
            <DatePicker container="inline"
              floatingLabelText="Fecha desde"
              onChange={(x, event) => this.setFechaDesde(x,event)}
              defaultDate={new Date()}
             />
          <p>¿Quienes fueron las persona(s) involucradas? (Nombre, aréa, puesto)?</p>
          <AutoComplete
            hintText="Ex. Licenciado Alberto Diaz"
            dataSource={this.state.dataPersonas}
            onUpdateInput={this.handleUpdateInputPersonas}
          />
          <p>¿Se lo has notificado a algún supervisor, gerente o Recursos Humanos?</p>
          <div onChange={this.getValue.bind(this)}>
            <input type="radio" name="check" value="Sí" checked={this.state.radio}/>
            <label>Si</label>
            <input type="radio" name="check" value="No" checked={this.state.radioT}/>
            <label>No</label>
          </div>
          <div id='nuevo-button'>
            <br />
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
