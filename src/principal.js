import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, BrowserRouter, Link, Redirect, Switch,Router } from 'react-router-dom'
import Reporte from './formReporte.js';
import Seguimiento from './seguimiento.js';
import Lista from './listaStatus.js';
import ReporteVoz from './reporteVoz.js';
import * as firebase from 'firebase';
import Main from './main.js'
import Admin from './admin.js'
import AdminList from './admin-list.js'
import Key from './admin-user.js'
import AppBar from './ActionBar'


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login' , state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/Admin' />}
    />
  )
}

class Routes extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {

      return this.state.loading === true ? <h1>Loading</h1> : (

          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/seguimiento" component={Seguimiento}/>
            <Route path="/lista" component={Lista}/>
            <Route path="/reporte" component={Reporte}/>
            <Route path="/GrabarRepo" component={ReporteVoz}/>
            <PublicRoute authed={this.state.authed} path='/login' component={Admin} />
            <PrivateRoute authed={this.state.authed} path='/admin' component={AdminList} />
            <PrivateRoute authed={this.state.authed} path='/:key' component={Key} />
            <Route render={() => <h3>Uups! algo paso mal :D</h3>} />
          </Switch>

    );
  }
}

const Principal = () =>{
  return(
    <div>
      <BrowserRouter>
          <div>
            <AppBar />
            <Routes />
          </div>
        </BrowserRouter>
      </div>
    );
}

export default Principal;
