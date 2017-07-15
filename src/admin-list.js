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

const style ={
  lineHeight: '5px',
  paddingBottom: '8px'
}

const styleItem = {
  
}

const Items = (props) =>{

  return(
    <div id='items'>
      {props.mails.map((mail,i) =>
        <div id='admin-list-item'>
          <Link to= {{
            pathname: props.mailsIds[i],
            state: { id: props.mailsIds[i]}
          }}>
          <Subheader>
            <strong> Fecha de envío: </strong> { props.mails[i].diaActual }
          </Subheader>
          <Subheader style={style}>
            <strong> Status: </strong>
              {
                props.mails[i].seguimientoActual.status
              }
          </Subheader>
          <ListItem
          style = {styleItem}
            primaryText= {props.mailsIds[i].toString()}
            secondaryText={
              <p>
                {props.mails[i].audio ? 'Se ha enviado un audio, da click aquí para escucharlo. ':props.mails[i].caso}
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
        let arrayId = [];
        let arraySeguimiento = [];

        var idRef = ref.child("reportes/");
        var seguimientoRef = idRef.child("seguimientoActual/")
        let self = this;
        this.state={
          date:date,
          mails: [],
          mailsIds: [],
          seguimiento: [],
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
            self.setState({
              mails: array,
              mailsIds: arrayId,
              seguimiento: arraySeguimiento
            })
          }
        )
  }

  render(){
    return(
        <div>
        <a onClick={() => firebaseAuth().signOut() } href="/admin">Salir</a>
          <List>
            <Items mails={this.state.mails} mailsIds={this.state.mailsIds} arraySeguimiento={this.state.seguimiento} />
          </List>
        </div>
    );
  }
}
export default ListaAdmin;
