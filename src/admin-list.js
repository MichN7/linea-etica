import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as firebase from 'firebase'
import { ref, firebaseAuth } from './const.js'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './admin-list.css'
import DropDownMenu from 'material-ui/DropDownMenu';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FontIcon from 'material-ui/FontIcon';
import MdAssignmentTurnedIn from 'react-icons/lib/md/assignment-turned-in';
import MdAssignmentLate from 'react-icons/lib/md/assignment-late';
import MdAssignment from 'react-icons/lib/md/assignment';
import MdBackspace from 'react-icons/lib/md/backspace';
import MdAssignmentInd from 'react-icons/lib/md/assignment-ind';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const checked = <MdAssignmentTurnedIn/>
const recibido = <MdAssignmentLate />
const proceso = <MdAssignment />
const salir = <MdBackspace />
const todos = <MdAssignmentInd />

const style ={
  lineHeight: '5px',
  paddingBottom: '9px'
}

const styleItem = {

}


const Items = (props) =>{
  let arrayActivo = [];
  let arrayActivoIds = [];
  if(props.selectedIndex == 0){

    for (var i = 0; i < props.mails.length; i++) {
      var d = new Date(props.mails[i].diaActual);
      var n = d.getMonth();
      if (props.value ==n+1 ){
      arrayActivo[i] = props.mails[i];
      arrayActivoIds[i] = props.mailsIds[i];
    }
    }
 }
  else if(props.selectedIndex == 1){
    for (var i = 0; i < props.arrayRecibido.length; i++) {
      var d = new Date(props.arrayRecibido[i].diaActual);
      var n = d.getMonth();
      if (props.value ==n+1 ){
        arrayActivo[i] = props.arrayRecibido[i];
        arrayActivoIds[i] = props.arrayRecibidoIds[i];
    }
    }
  }
  else if(props.selectedIndex == 2){
    for (var i = 0; i < props.arrayCompletos.length; i++) {
      var d = new Date(props.arrayCompletos[i].diaActual);
      var n = d.getMonth();
      if (props.value ==n+1 ){
        arrayActivo[i] = props.arrayCompletos[i];
        arrayActivoIds[i] = props.arrayCompletosIds[i];
    }
    }

  }  else if(props.selectedIndex == 3){
    for (var i = 0; i < props.arrayEnProceso.length; i++) {
      var d = new Date(props.arrayEnProceso[i].diaActual);
      var n = d.getMonth();
      if (props.value ==n+1 ){
        arrayActivo = props.arrayEnProceso;
        arrayActivoIds = props.arrayEnProcesoIds;
    }
    }

    }
  return(
    <div id='items'>
      {arrayActivo.map((mail,i) =>
        <div id='admin-list-item'>
          <Link to= {{
            pathname: arrayActivoIds[i],
            state: { id: arrayActivoIds[i]}
          }}>
          <Subheader>
            <strong> Fecha de envío: </strong> { arrayActivo[i].diaActualT }
          </Subheader>
          <Subheader style={style}>
            <strong> Status: </strong>
              {
                arrayActivo[i].seguimientoActual.status
              }
          </Subheader>
          <ListItem
          style = {styleItem}
            primaryText= {arrayActivoIds[i].toString()}
            secondaryText={
              <p>
                {arrayActivo[i].audio ? 'Se ha enviado un audio, da click aquí para escucharlo. ':arrayActivo[i].caso}
              </p>
            }
            secondaryTextLines={2}
          />
          </Link>
          <Divider inset={true}/>
        </div>
      )}
    </div>
  )
}

class ListaAdmin extends Component{
  constructor(){
    super();
    let today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear() ;
        var database = firebase.database();
        var ref = database.ref();
        var array = [];
        let arrayCompletos = [];
        let arrayCompletosIds = [];
        let arrayEnProceso = [];
        let arrayEnProcesoIds = [];
        let arrayRecibido = [];
        let arrayRecibidoIds = [];
        let arrayId = [];
        let arraySeguimiento = [];

        var idRef = ref.child("reportes/");
        var seguimientoRef = idRef.child("seguimientoActual/")
        let self = this;
        var d = new Date();

        this.state={
          date:date,
          mails: [],
          mailsIds: [],
          seguimiento: [],
          selectedIndex: 0,
          completados:[],
          completadosIds:[],
          recibidos:[],
          recibidosIds:[],
          seguidos:[],
          seguidosIds:[],
          value: d.getMonth()+1,
        }

        var promise = new Promise(
          function(resolve,reject){
            idRef.orderByChild("diaActual").on("value", function(snapshot) {
            snapshot.forEach(function(child) {
                resolve(
                  child.forEach(function(grandchild){
                    arraySeguimiento = arraySeguimiento.concat(grandchild.val())
                  }),
                  array = array.concat(child.val()),
                  arrayId = arrayId.concat(child.key),
                );
              });
            });

          }
        )
        promise.then(
          function(){
            for (var i = 0; i < array.length; i++) {
              if(array[i].seguimientoActual.status == "Completado"){
                arrayCompletos = arrayCompletos.concat(array[i]);
                arrayCompletosIds = arrayCompletosIds.concat(arrayId[i]);
              }else if(array[i].seguimientoActual.status == "Recibido"){
                arrayRecibido = arrayRecibido.concat(array[i]);
                arrayRecibidoIds = arrayRecibidoIds.concat(arrayId[i]);
              }else if(array[i].seguimientoActual.status == "En proceso"){
                arrayEnProceso = arrayEnProceso.concat(array[i]);
                arrayEnProcesoIds = arrayEnProcesoIds.concat(arrayId[i]);
              }
            }
            self.setState({
              mails: array,
              mailsIds: arrayId,
              seguimiento: arraySeguimiento,
              completados: arrayCompletos,
              completadosIds: arrayCompletosIds,
              seguidos: arrayEnProceso,
              seguidosIds: arrayEnProcesoIds,
              recibidos: arrayRecibido,
              recibidosIds: arrayRecibidoIds,
            })
          }
        )
  }

  select = (index) => this.setState({selectedIndex: index});
  handleChange = (event, index, value) => this.setState({value});
  render(){
    return(
        <div>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="TODOS"
                icon={todos}
                onClick={() => this.select(0)}
              />
              <BottomNavigationItem
                label="RECIBIDO"
                icon={recibido}
                onClick={() => this.select(1)}
              />
              <BottomNavigationItem
                label="COMPLETO"
                icon={checked}
                onClick={() => this.select(2)}
              />
              <BottomNavigationItem
                label="EN PROCESO"
                icon={proceso}
                onClick={() => this.select(3)}
              />
              <BottomNavigationItem
                label="SALIR"
                icon={salir}
                onClick={() => firebaseAuth().signOut()}
              />
            </BottomNavigation>
          </Paper>
          <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={true}>
        <MenuItem value={1} primaryText="Enero" />
        <MenuItem value={2} primaryText="Febrero" />
        <MenuItem value={3} primaryText="Marzo" />
        <MenuItem value={4} primaryText="Abril" />
        <MenuItem value={5} primaryText="Mayo" />
        <MenuItem value={6} primaryText="Junio" />
        <MenuItem value={7} primaryText="Julio" />
        <MenuItem value={8} primaryText="Agosto" />
        <MenuItem value={9} primaryText="Septiembre" />
        <MenuItem value={10} primaryText="Octubre" />
        <MenuItem value={11} primaryText="Noviembre" />
        <MenuItem value={12} primaryText="Diciembre" />


      </DropDownMenu>
          <List>
            <Items mails={this.state.mails}
                   mailsIds={this.state.mailsIds}
                   arraySeguimiento={this.state.seguimiento}
                   selectedIndex={this.state.selectedIndex}
                   arrayRecibido={this.state.recibidos}
                   arrayRecibidoIds={this.state.recibidosIds}
                   arrayEnProcesoIds={this.state.seguidosIds}
                   arrayEnProceso={this.state.seguidos}
                   arrayCompletos={this.state.completados}
                   arrayCompletosIds={this.state.completadosIds}
                   value={this.state.value}
                    />
          </List>
        </div>
    );
  }
}
export default ListaAdmin;
