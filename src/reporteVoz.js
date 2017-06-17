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




class ReporteVoz extends Component{
  constructor(props){
    super(props);
    this.state = {
      record: false,
      blobObject: null,
      isRecording: false
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
      blobURL : blobObject.blobURL
    })
  }
  submit = () => {
    confirmAlert({
      title: 'Linea-Etica',                        // Title dialog
      message: 'Estas seguro que quieres mandar este audio?',               // Message dialog
      confirmLabel: 'Enviar',                           // Text button confirm
      cancelLabel: 'Cancelar',                             // Text button cancel
      onConfirm: () =>alert('subiendo audio'+this.state.blobURL),    
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
       <div>
         <h2>Graba tu reporte</h2>
         <p>1.-Menciona tu nombre y apellidos (opcional)</p>
         <p>2.-Fecha y hora de lo ocurrido </p>
         <p>3.-Personas involucradar (nombre,area,puesto)</p>
         <p>4.-¿Se lo ha notificado a la Dirección?</p>
         <p>5.-Describa lo ocurrido</p>
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
       <button onClick={this.submit}>Enviar Audio</button>
     </div>
       </div>
   </MuiThemeProvider>

    );
  }
}
export default ReporteVoz;
