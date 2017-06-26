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
var avatar="https://lh5.googleusercontent.com/WzOu1Kmx4A7dRopd0G52T3dbNx-cujHOidqd1c_VMxTieeTFdUMzpCdIV_-aNpkGU5TCgRrQKQ";

const Items = (props) =>{
  return(
    <div>
      {props.mails.map((mail,i) =>
        <div>
        <ListItem
          primaryText= {props.mailsIds[i].toString()}
          secondaryText={
            <p>
              {props.mails[i].caso}
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        </div>
      )}
    </div>
  )
}

class ListaAdmin extends Component{
  constructor(){
    super();
    let today = new Date(),
        date = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
        this.state={
          date:date,
          mails: [],
          mailsIds: []
        }
        var database = firebase.database();
        var ref = database.ref();
        var array = [];
        let arrayId = [];
        var idRef = ref.child("reportes/");
        let self = this;
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

            alert(self.state.mails[1].caso)
          }
        )

  }

  render(){
    return(
        <div>
          <List>
            <Subheader>{this.state.date}</Subheader>
            <Items mails={this.state.mails} mailsIds={this.state.mailsIds}/>
          </List>
        </div>
    );
  }
}
export default ListaAdmin;
