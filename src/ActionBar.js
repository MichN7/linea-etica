import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link, Route} from 'react-router-dom'
import Seguimiento from './seguimiento.js';
import "./ActionBar.css"

const styleItemsTop = {
 width:'100%',
 whiteSpace: 'none',
 lineHeight: '%1',
 paddingTop:'10%',
 paddingBottom:'10%',
};

const styleItemsSecond = {
 width:'100%',
 whiteSpace: 'none',
 lineHeight: '1%',
 paddingTop:22,
};

const styleItemsThird = {
 width:'100%',
 whiteSpace: 'none',
 lineHeight: '1%',
 paddingTop:22,
};

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
              <MenuItem onTouchTap={this.handleClose} style={styleItemsTop}>DAR SEGUIMIENTO A REPORTE</MenuItem>
            </Link>
            <Link to="/reporte">
              <MenuItem onTouchTap={this.handleClose} style={styleItemsSecond}>NUEVO REPORTE</MenuItem>
            </Link>
            <Link to="/administrador">
              <MenuItem onTouchTap={this.handleClose} style={styleItemsThird}>ADMINISTRADOR</MenuItem>
            </Link>
          </Drawer>
        </div>
    );
  }
}


export default AppBarExampleIcon;
