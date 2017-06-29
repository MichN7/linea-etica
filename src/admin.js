import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import { ref, firebaseAuth } from './const.js'

import './admin.css'

const styleCorreo = {
    color: '#0EBFE9',
};

const styleContrasena = {
    color: '#FF4081',
};

class Admin extends Component{
  state= {
    email: null,
    password: null
  }
  handleSubmit = () => {
   firebaseAuth().signInWithEmailAndPassword(this.state.email,this.state.password)
     .catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
       if (errorCode === 'auth/wrong-password') {

               alert('contraseña incorrecta');
           }
       else if(errorCode==='auth/user-not-found'){
             alert('Usuario inexistente');
       }
           else {
                   alert(errorMessage);
                 }
                 console.log(error);

 });
 }

 handleChangeEmail = (event) => {

    this.setState({
      email:event.target.value
    });

  }

  handleChangePassword = (event) => {

     this.setState({
       password:event.target.value
     });

   }

  render(){
    return(
      <div id='admin-form'>
        <div id='admin-correo'>
          <p>CORREO</p>
         <TextField ref='notas' hintText="" required type="email"
          onChange={this.handleChangeEmail}
           errorText="Este campo es requerido"
          />
        </div>
        <div id='admin-contrasena'>
          <p>CONTRASEÑA</p>
        <TextField ref='notas' hintText="" required type="password"
         onChange={this.handleChangePassword}
          errorText="Este campo es requerido"
         />
        </div>
        <div id='admin-button'>
          <RaisedButton
          label="Aceptar"
          type="submit"
          secondary={true}
          onTouchTap={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default Admin;
