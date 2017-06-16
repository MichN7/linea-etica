import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton,
        MuiThemeProvider }         from 'material-ui';
import MicrophoneOn                from 'material-ui/svg-icons/av/mic';
import MicrophoneOff               from 'material-ui/svg-icons/av/stop';
import sampleAudio                 from './sample_audio.webm';
import ReactGA                     from 'react-ga';
import { ReactMic } from 'react-mic';



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

  render(){
    const { isRecording } = this.state;

    return(
     <MuiThemeProvider>
       <div>
         <h2>Graba tu reporte</h2>
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
         <p>As featured in the course <br /><a href="http://singlepageapplication.com">How to Write a Single Page Application</a></p>
       </div>
   </MuiThemeProvider>

    );
  }
}
export default ReporteVoz;
