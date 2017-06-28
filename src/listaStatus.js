import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
var avatar="https://lh5.googleusercontent.com/WzOu1Kmx4A7dRopd0G52T3dbNx-cujHOidqd1c_VMxTieeTFdUMzpCdIV_-aNpkGU5TCgRrQKQ";
class Lista extends Component{
  constructor(props){
    super();
    alert('hola');
    var x=props.location.state.nip;
    alert(x[0]);
  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          <List>
            <Subheader>Today</Subheader>
            <ListItem
              leftAvatar={<Avatar src={avatar} />}
              primaryText="Brunch this weekend?"
              secondaryText={
                <p>
                <span style={{color: darkBlack}}>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2}
            />

          <Divider inset={true} />
      <ListItem
        leftAvatar={<Avatar src={avatar} />}
        primaryText={
          <p>Summer BBQ&nbsp;&nbsp;<span style={{color: lightBlack}}>4</span></p>
        }
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>to me, Scott, Jennifer</span> --
            Wish I could come, but I&apos;m out of town this weekend.
          </p>
        }
        secondaryTextLines={2}
      />
      <Divider inset={true} />
      <ListItem
        leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
        primaryText="Oui oui"
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>Grace Ng</span> --
            Do you have Paris recommendations? Have you ever been?
          </p>
        }
        secondaryTextLines={2}
      />
      <Divider inset={true} />
      <ListItem
        leftAvatar={<Avatar src="images/kerem-128.jpg" />}
        primaryText="Birdthday gift"
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>Kerem Suer</span> --
            Do you have any ideas what we can get Heidi for her birthday? How about a pony?
          </p>
        }
        secondaryTextLines={2}
      />
      <Divider inset={true} />
      <ListItem
        leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
        primaryText="Recipe to try"
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>Raquel Parrado</span> --
            We should eat this: grated squash. Corn and tomatillo tacos.
          </p>
        }
        secondaryTextLines={2}
      />
    </List>
  </div>
      </MuiThemeProvider>
    );
  }
}
export default Lista;
