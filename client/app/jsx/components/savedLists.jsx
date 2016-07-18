import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const style = {
  width: '75%',
};

const iconButtonElement = (
  <IconButton
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem primaryText="Open" />
    <MenuItem primaryText="Delete" />
  </IconMenu>
);

class SavedLists extends React.Component {
  constructor() {
    super()
    this.state = {};
  }

  render() {
    return (
      <div className="c3">
        <Card>
          <CardHeader
            title="Saved Lists"
          />
          <CardText className="cardText">
            <TextField
              floatingLabelText="Enter the Name"
              className="listText"
              style={style}
            />
            <RaisedButton
              className="submit"
              secondary={true}
              label="Save List"
            />
            <List>
              <Subheader>Today</Subheader>
              <ListItem
                rightIconButton={rightIconMenu}
                primaryText="Junk Food"
              />
              <Divider />
              <ListItem
                rightIconButton={rightIconMenu}
                primaryText="Healthy Food"
              />
              <Divider />
              <ListItem
                rightIconButton={rightIconMenu}
                primaryText="Baller Food"
              />
            </List>
          </CardText>
        </Card>
      </div>
    )
  };

}

module.exports = SavedLists;