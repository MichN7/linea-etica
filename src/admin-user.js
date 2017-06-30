import React,{Component} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import * as firebase from 'firebase'
import './admin-user.css'
import RaisedButton from 'material-ui/RaisedButton';
import { ref } from './const.js'

const Carta = (props) =>{
  let caso = props.idData[0];
  let dia = props.idData[1];
  let hora = props.idData[2];
  let lugar = props.idData[3];
  let nombre = props.idData[4];
  let personaInvolucrada = props.idData[5];
  let radio = props.idData[6];
  let id = props.id;
  return(
    <div>
      <Card>
        <CardHeader
          title={id}
          subtitle={
            <div>
            <p><strong>Sucedió el día:</strong> {dia}</p>
            <p><strong>Sucedió a las:</strong> {hora}</p>
            <p><strong>Sucedió en:</strong> {lugar}</p>
            <p><strong>Personas Involucradas:</strong> {personaInvolucrada}</p>
            <p><strong>Se le notificó a algún supervisor, gerente o Recursos Humanos:</strong> {radio}</p>
            </div>
          }
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText expandable={false}>
          {caso}
        </CardText>
      </Card>
    </div>
  )
}

class Respuesta extends Component{
  constructor(props){
    super();
    let today = new Date,
    date = today.getDate()+ '-' + '0'+(today.getMonth() + 1) + '-' + today.getFullYear() ;
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
    alert(this.state.dataNotas);
    alert(this.state.radioVal);
    var refDB = ref.child("reportes/"+this.state.id + "/" + "seguimiento");
    refDB.push({
      notas: `${this.state.dataNotas}`,
      status: `${this.state.radioVal}`,
      fecha: `${this.state.fecha}`,
    })
  }

  getValue = (e) =>{
    alert(e.target.value);
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
