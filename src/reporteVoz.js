import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton,
        MuiThemeProvider }         from 'material-ui';
import MicrophoneOn                from 'material-ui/svg-icons/av/mic';
import MicrophoneOff               from 'material-ui/svg-icons/av/stop';
import sampleAudio                 from './sample_audio.webm';
import ReactGA                     from 'react-ga';
import { ReactMic } from 'react-mic';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import './reporteVoz.css';
import './react-confirm-alert.css';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase'

import { ref, firebaseAuth } from './const.js'
var id = require('shortid')

const styleRecord = {
 color : 'blue',
};

const styleGrabacion = {
  width: '100%',
  height: '100%',
}

class ReporteVoz extends Component{
  constructor(props){
    super(props);
    var idReporte=id.generate();


    this.state = {
      id: idReporte,
      record: false,
      blobObject: null,
      isRecording: false,
      diaTT:[],
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  startRecording= () => {
    this.setState({
      record: true,
      isRecording: true
    });
  }

  stopRecording= () => {
    this.setState({
      record: false,
      isRecording: false
    });
  }

  onStop= (blobObject) => {

    this.setState({
      blobURL : blobObject.blobURL,
      blob: blobObject.blob
    })
  }

  subirStorage(audio){

  }

  submit = () => {
    var promise;
    var self=this;
    confirmAlert({
      title: 'Linea-Etica',                        // Title dialog
      message: 'Estas seguro que quieres mandar este audio?',               // Message dialog
      confirmLabel: 'Enviar',                           // Text button confirm
      cancelLabel: 'Cancelar',                             // Text button cancel
      onConfirm: () => {
        var audio = this.state.blob;
        var downloadURL;
        var storageRef = firebase.storage().ref(`${this.state.id}`);
        var file = audio;
        const task = storageRef.put(file);
         promise=new Promise(
          function(resolve,reject){
        task.on('state_changed', function(snapshot){

        }, function(error) {
          alert("error");
        }, function() {
        resolve(downloadURL = task.snapshot.downloadURL);
        });
      })//end promise
      promise.then(
        function(url){
          var today = new Date,
          date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();
          var refDB=ref.child("reportes/" +`${self.state.id}`);
          var refDBStatus=ref.child("reportes/"+ `${self.state.id}` + "/seguimiento");
          var refDBStatusActual=ref.child("reportes/"+ `${self.state.id}` + "/seguimientoActual");
          refDB.set({
            audioURL:url,
            audio:true,
            diaActual: today.getTime(),
            diaActualT:date,
          }),
          refDBStatus.push({
            notas: 'El reporte ha sido recibido pero aún no se ha revisado',
            status: 'Recibido',
            fecha: date,
            audio:true
          }),
          refDBStatusActual.set({
            notas: 'El reporte ha sido recibido pero aún no se ha revisado',
            status: 'Recibido',
            fecha: date,
            audio:true
          }),
          confirmAlert({
             title: 'Linea-Etica',
             message:  "El reporte fue enviado, para darle seguimiento conserva este código : " +self.state.id,
             confirmLabel: 'Aceptar',  // Text button confirm
             onConfirm: () => {
               window.location.reload();
          },
          onCancel: () => {window.location.reload();}

        })
        }
      )

      },
      onCancel: () =>   this.setState({
          record: false,
          isRecording: false
        }),      // Action after Cancel
    })

  };

  render(){
    const { isRecording } = this.state;

    return(
     <MuiThemeProvider>
       <div id='grabar'>
         <h2>Graba tu reporte</h2>
          <p>1.- Menciona tu nombre y apellidos (Opcional)</p>
          <p>2.- ¿Donde, qué día y a qué hora ocurrió?</p>
          <p>3.- ¿Quiénes fueron las persona(s) involucradas? (Nombre, aréa, puesto)</p>
          <p>4.- ¿Se lo has notificado a algún supervisor, gerente o Recursos Humanos?</p>
          <p>5.- Describe lo ocurrido</p>
         <ReactMic
           className="oscilloscope"
           record={this.state.record}
           backgroundColor="#FF4081"
           visualSetting="sinewave"
           onStop={this.onStop}
           strokeColor="#000000" />
         <div>
           <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
         </div>
         <br />
         <br />
         <FloatingActionButton
           className="btn"
           secondary={true}
           disabled={isRecording}
           style={styleRecord}
           onClick={this.startRecording}>
           <MicrophoneOn />
         </FloatingActionButton>
         <FloatingActionButton
           className="btn"
           secondary={true}
           disabled={!isRecording}
           onClick={this.stopRecording}>
           <MicrophoneOff />
         </FloatingActionButton>
         <br />
         <br />
         <br />
         <div className="buttonConfirm">
         <RaisedButton
           label="Enviar Audio"
           type="submit"
           secondary={true}
           onTouchTap={this.submit}
         />
     </div>
       </div>
   </MuiThemeProvider>

    );
  }
}
export default ReporteVoz;
