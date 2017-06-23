import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link, Route} from 'react-router-dom'
import Seguimiento from './seguimiento.js';
import "./ActionBar.css"

class AppBarExampleIcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
      return(
        <div id='navbar'>
          <AppBar
            title="LINEA ÉTICA GAM"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onTouchTap={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <Link to="/seguimiento">
              <MenuItem onTouchTap={this.handleClose}>Dar seguimiento a reporte</MenuItem>
            </Link>
            <Link to="/reporte">
              <MenuItem onTouchTap={this.handleClose}>Nuevo Reporte</MenuItem>
            </Link>
          </Drawer>
        </div>
    );
  }
}


export default AppBarExampleIcon;
