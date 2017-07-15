import React,{Component} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import * as firebase from 'firebase'
import './admin-user.css'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import RaisedButton from 'material-ui/RaisedButton';
import { ref } from './const.js'
import { Route, BrowserRouter, Link, Redirect, Switch,Router } from 'react-router-dom'


const Carta = (props) =>{
  let audio = props.idData[0];
  let caso = props.idData[1];
  let dia = props.idData[2];
  let diaActual = props.idData[3];
  let hora = props.idData[4];
  let lugar = props.idData[5];
  let nombre = props.idData[6];
  let personaInvolucrada = props.idData[7];
  let radio = props.idData[8];
  let id = props.id;

  return(
    <div>
      <Card>
        <CardHeader
          title={id}
          subtitle={
            <div>
              {audio === false ?
                <div>
                  <p><strong>Sucedió el día:</strong> {dia}</p>
                  <p><strong>Sucedió a las:</strong> {hora}</p>
                  <p><strong>Sucedió en:</strong> {lugar}</p>
                  <p><strong>Personas Involucradas:</strong> {personaInvolucrada}</p>
                  <p><strong>Se le notificó a algún supervisor, gerente o Recursos Humanos:</strong> {radio}</p>
                  <p><strong>Status: </strong> {props.idData[10].status} </p>
                </div>
              :" " }
              {audio === true ?
                <div>
                  <p>Haga click en el botón de play para reproducir</p>
                  <p>Status: {props.idData[4].status}</p>
                </div>
                : " "
              }
            </div>
          }
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText expandable={false}>
          {audio ?
            <div>
            <audio controls="controls" src={caso}></audio>
            </div>
            :" "
          }
          {
            audio === false ?
            caso : " "
          }
        </CardText>
      </Card>
    </div>
  )
}

class Respuesta extends Component{
  constructor(props){
    super();
    let today = new Date,
    date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear()
    this.state={
      dataNotas:[],
      id: props.id,
      fecha: date,
      radioVal: null,
      radioOne: false,
      radioTwo: false,
      radioThree: false
    }
  }

  submit = () =>{

    var refSeguimiento = ref.child("reportes/"+this.state.id + "/" + "seguimiento");
    var refSeguimientoActual = ref.child("reportes/"+this.state.id + "/" + "seguimientoActual");
    refSeguimientoActual.update({
      notas: `${this.state.dataNotas}`,
      status: `${this.state.radioVal}`,
      fecha: `${this.state.fecha}`,
    })
    refSeguimiento.push({
      notas: `${this.state.dataNotas}`,
      status: `${this.state.radioVal}`,
      fecha: `${this.state.fecha}`,
    })
    confirmAlert({
       title: 'Linea-Etica',
       message:  "El estado del reporte se ha actualizado exitosamente",
       confirmLabel: 'Aceptar',  // Text button confirm
       onConfirm: () => {
        window.location.href = "/admin";
    },
    onCancel: () => {window.location.href = "/admin";}
  })

  }

  getValue = (e) =>{
    let value = e.target.value;
    if(value === "Recibido"){
      this.setState({
        radioOne:true,
        radioTwo:false,
        radioThree:false,
        radioVal: value,
      })
    }else if (value === "En proceso") {
      this.setState({
        radioOne: false,
        radioTwo: true,
        radioThree: false,
        radioVal: value,
      })
    }else if (value === "Completado") {
      this.setState({
        radioOne: false,
        radioTwo: false,
        radioThree: true,
        radioVal: value,
      })
    }
  }

  handleChange = (event) =>{
    this.setState({
      dataNotas:event.target.value
    })
  }

  render(){
    return(
      <div id="respuesta">
        <textarea id="respuesta-input"
        type="text"
        required placeholder="Da click aquí para escribir tu respuesta"
        onChange={this.handleChange}/>
        <h4>Status</h4>
        <div onChange={this.getValue} id="respuesta-radioButtons">
          <input type="radio" name="check"  value="Recibido" checked = {this.state.radioOne}/>
          <label>Recibido</label>
          <input type="radio" name="check"  value="En proceso" checked = {this.state.radioTwo} />
          <label>En proceso</label>
          <input type="radio" name="check" value="Completado" checked = {this.state.radioThree} />
          <label>Completado</label>
        </div>
        <div id="respuesta-button">
          <RaisedButton
          label=" Enviar "
          secondary={true}
          type="submit"
          onTouchTap={this.submit}
          />
        </div>
      </div>
    )
  }
}

class Key extends Component{
  constructor(props){
    super();
    var id = props.location.state.id;
    let self = this;
    let array = [];
    var database = firebase.database();
    var ref = database.ref("reportes/"+id);
    let statusArray = [];

    this.state={
      id: id,
      idData: []
    }

  var promise = new Promise(
      function(resolve,reject){
      ref.on('value', function(snapshot) {

        snapshot.forEach(function(child){
          resolve(
            array = array.concat(child.val()),

          );
        })
      });
    }
  )
    promise.then(
      function(){
        self.setState({
          idData: array
        })
      }
    )
}

  render(){
    return(
      <div>
       <Carta idData={this.state.idData} id={this.state.id}/>
       <br/>
       <Respuesta id={this.state.id} />
      </div>
    )
  }
}
export default Key;
