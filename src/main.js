import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import "./main.css"

class Main extends Component{
  render(){
    return(
      <div id='main'>
        <div id='main-seguimiento'>
          <RaisedButton
            label="Dar Seguimiento a reporte"
            type="submit"
            secondary={true}
            href="/seguimiento"
          />
        </div>
        <div id='main-nuevo'>
          <RaisedButton
            label="Nuevo reporte"
            type="submit"
            secondary={true}
            href="/reporte"
          />
        </div>
      </div>
    )
  }
}

export default Main;
