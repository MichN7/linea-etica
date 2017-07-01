import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import ReporteVoz from './reporteVoz.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './formReporte.css'
import './react-confirm-alert.css'
import { ref } from './const.js'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
var id = require('shortid');

const styletext = {
    width: '70%',
};

class Reporte extends Component {
  constructor(){
    super()
    let self = this;
  this.state = {
    id: '0',
    dataLugar: [],
    dataPersonas:[],
    dataHora:[],
    radioVal: null,
    nombre: [],

 };


 }
 componentWillMount(){
  var idReporte=id.generate();
   this.setState({
     id:idReporte,
     open:false,
     radio: false,
     radioT:false,
     repo: false
   });

 }


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
 handleUpdateInputNombre = (value) => {

   this.setState({
     nombre: [
       value
     ]
   });
 };

 handleUpdateInputNombre = (value) => {

   this.setState({
     dataNombre: [
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

 }
   setFechaDesde(x,event){
     var fecha=JSON.stringify(event);
    var fechaFormat=fecha.substring(1,11);
        this.setState({
          dia:fechaFormat
        })
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
   submit = () => {
     let today = new Date,
     date = today.getDate()+ '-' + '0'+(today.getMonth() + 1) + '-' + today.getFullYear() ;
     confirmAlert({
       title: 'Linea-Etica',                        // Title dialog
       message:  "¿Está seguro que desea enviar el reporte? ",               // Message dialog
       confirmLabel: 'Enviar',                           // Text button confirm
       cancelLabel: 'Cancelar',                             // Text button cancel
       onConfirm: () => {

           var refDB=ref.child("reportes/" +this.state.id);
           var refDBStatus=ref.child("reportes/"+ this.state.id+ "/seguimiento");
             refDB.set({
               nombre:`${this.state.nombre}`,
               caso:`${this.state.caso}`,
               lugar:`${this.state.dataLugar}`,
               personaInvolucrada:`${this.state.dataPersonas}`,
               hora:`${this.state.dataHora}`,
               dia:`${this.state.dia}`,
               diaActual:today.getTime(),
               radio: `${this.state.radioVal}`,
              audio:false
             }),
             refDBStatus.push({
               notas: 'El reporte ha sido recibido pero aún no se ha revisado',
               status: 'Recibido',
               fecha: date,
               audio:false
             }),
             this.setState({
                 id:'0',
                 dataLugar: [],
                 dataPersonas:[],
                 dataHora:[],
                 radioVal: null,
                 nombre: []
               })
               confirmAlert({
                 title: 'Linea-Etica',                        // Title dialog
                 message:  "El reporte fue enviado, para darle seguimiento conserva este código : " +this.state.id,               // Message dialog
                 confirmLabel: 'Ok',                           // Text button confirm
                 onConfirm: () => {window.location.reload()},
                  onCancel: () =>{window.location.reload()},
               })

       },
       onCancel: () =>   this.setState({
           record: false,
           isRecording: false
         }),      // Action after Cancel
     })

   };

   render() {

    return (

      <div id='nuevo'>

      <p>REPORTE DE CASO,
      en este espacio puedes reportar la situación detectada de prácticas qué van en contra de nuestros principios
       y valores.</p>
         <Link to="/GrabarRepo">¿Prefieres grabar el reporte?</Link>
       <div>
       <br/>
       <p>Escribe tu nombre y apellido (opcional)</p>
       <AutoComplete
           hintText="Ex. Jose López Pérez o Anonimo"
           dataSource={this.state.nombre}
           onUpdateInput={this.handleUpdateInputNombre}
         />
         <p>Describe brevemente lo ocurrido</p>
        <TextField ref='notas' hintText="" multiLine={true} rows={2} rowsMax={4}
         value={this.state.caso}
         onChange={this.handleChangeNotas}
         />
        </div>
        <p>¿En dónde fue lo ocurrido?</p>
        <AutoComplete
            hintText="Ex. Almacén"
            dataSource={this.state.dataLugar}
            onUpdateInput={this.handleUpdateInputLugar}
          />
          <p>¿A qué hora sucedió?</p>
          <AutoComplete
              hintText="Ex. 3:00 pm"
              dataSource={this.state.dataHora}
              onUpdateInput={this.handleUpdateInputHora}
          />
            <p>¿En qué día?</p>
            <DatePicker container="inline"
              onChange={(x, event) => this.setFechaDesde(x,event)}
             />
          <p>¿Quiénes fueron las personas involucradas? (Nombre, aréa, puesto)?</p>
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
              label="Enviar Reporte"
              type="submit"
              secondary={true}
              onTouchTap={this.submit}
            />
          </div>

      </div>


    );
  }
}

export default Reporte;
