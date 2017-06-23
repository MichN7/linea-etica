import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import './admin.css'

const styleCorreo = {
    color: '#0EBFE9',
};

const styleContrasena = {
    color: '#FF4081',
};

class Admin extends Component{
  render(){
    return(
      <div id='admin-form'>
        <div id='admin-correo'>
          <p>CORREO</p>
          <TextField
            hintText="Ex.Alberto@gmail.com"
          />
        </div>
        <div id='admin-contrasena'>
          <p>CONTRASEÑA</p>
          <TextField
            hintText=""
            type="password"
          />
        </div>
        <div id='admin-button'>
          <RaisedButton
          label="Aceptar"
          type="submit"
          secondary={true}
          />
        </div>
      </div>
    )
  }
}

export default Admin;
