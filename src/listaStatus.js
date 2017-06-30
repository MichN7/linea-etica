import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ref } from './const.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
var avatar="https://lh5.googleusercontent.com/WzOu1Kmx4A7dRopd0G52T3dbNx-cujHOidqd1c_VMxTieeTFdUMzpCdIV_-aNpkGU5TCgRrQKQ";

const Listado =(props)=>{
  return(
    <div>
    {props.objeto.map((msg,i)=>
      <div>
    <ListItem
      leftAvatar={<Avatar src={avatar} />}
      primaryText={props.objeto[i].fecha}
      secondaryText={
        <p>
        <span style={{color: darkBlack}}>{props.objeto[i].status}</span> --
        {props.objeto[i].notas}
        </p>
      }
      secondaryTextLines={2}
    />

    <Divider inset={true} />
    </div>
  )}
    </div>

  );
}

class Lista extends Component{
  constructor(props){
      super()
    var array=[];
    var x=props.location.state.nip;
    var referencia=ref.child("reportes/"+ x[0]+"/seguimiento");//reportes/x[0]/status
    let self=this;
    this.state={
          mensajes:[]
    }
    var promise= new Promise(
    function(resolve, reject){
        referencia.on('value',data =>  {
          console.log(data.val());
          data.forEach(function(childSnapshot){
            var datos=childSnapshot.val();
          resolve(array=array.concat({fecha:datos.fecha,notas:datos.notas,
            status:datos.status}));
          })
      });
    }
  )

  promise.then(
    function(){
      self.setState({
        mensajes:array
      })
    }
  );

  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          <List>
            <Subheader>Today</Subheader>
            <Listado objeto={this.state.mensajes}/>


    </List>
  </div>
      </MuiThemeProvider>
    );
  }
}
export default Lista;
