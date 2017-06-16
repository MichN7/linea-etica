import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const AppBarExampleIcon = () => (
  <MuiThemeProvider>
  <AppBar
    title="LINEA ÉTICA GAM"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  </MuiThemeProvider>
);

export default AppBarExampleIcon;
