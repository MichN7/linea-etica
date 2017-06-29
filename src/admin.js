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
  handleSubmit = (e) => {
   e.preventDefault()
   firebaseAuth().signInWithEmailAndPassword(this.email.value,this.pw.value)
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
  render(){
    return(
       <form onSubmit={this.handleSubmit}  role="form">
      <div id='admin-form'>
        <div id='admin-correo'>
          <p>CORREO</p>
         <input  id="inputEmail3" name='email' ref={(email) => this.email = email} placeholder="Email" required/>
        </div>
        <div id='admin-contrasena'>
          <p>CONTRASEÑA</p>
        <input  name='pass' id="inputPassword3" placeholder="Password" type="password" ref={(pw) => this.pw = pw} required/>
        </div>
        <div id='admin-button'>
          <RaisedButton
          label="Aceptar"
          type="submit"
          />
        </div>
      </div>
       </form>
    )
  }
}

export default Admin;
