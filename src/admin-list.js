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

var avatar="https://lh5.googleusercontent.com/WzOu1Kmx4A7dRopd0G52T3dbNx-cujHOidqd1c_VMxTieeTFdUMzpCdIV_-aNpkGU5TCgRrQKQ";

const Items = (props) =>{
  return(
    <div id='items'>
      {props.mails.map((mail,i) =>
        <div>
        <Link to= {{
          pathname: props.mailsIds[i],
          state: { id: props.mailsIds[i]}
        }}>
        <ListItem
          primaryText= {props.mailsIds[i].toString()}
          secondaryText={
            <p>
              {props.mails[i].audio ? 'Se ha enviado un audio, da click aquí para escucharlo.' : props.mails[i].caso}
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
        date = today.getDate()+ '-' + '0' +(today.getMonth() + 1) + '-' + today.getFullYear() ;
        var database = firebase.database();
        var ref = database.ref();
        var array = [];
        let arrayId = [];
        var idRef = ref.child("reportes/");
        let self = this;
        this.state={
          date:date,
          mails: [],
          mailsIds: []
        }

        var promise = new Promise(
          function(resolve,reject){
            idRef.on("value", function(snapshot) {
            snapshot.forEach(function(child) {
                resolve(
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
              mailsIds: arrayId
            })
          }
        )

  }

  render(){
    return(
        <div>
        <a onClick={() => firebaseAuth().signOut() } href="/admin">Salir</a>
          <List>
            <Subheader>{this.state.date}</Subheader>
            <Items mails={this.state.mails} mailsIds={this.state.mailsIds}/>
          </List>
        </div>
    );
  }
}
export default ListaAdmin;
