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
import {Tabs, Tab} from 'material-ui/Tabs';

const style = {
  card: {
    width: '75%',
  },
  lunchButton: {
    margin: 15,
    width: '20%', 
    height: 64,
    padding: 0,
  },
  button: {
    margin: 15,
    padding: 0,
    marginLeft: 15,
    marginRight: 0
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
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
    <MenuItem primaryText="Send to Eaten" />
    <MenuItem primaryText="Delete" />
  </IconMenu>
);

const pastMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem primaryText="Send back to Roulette" />
    <MenuItem primaryText="Delete" />
  </IconMenu>
);

class LunchRoulette extends React.Component {
  constructor() {
    super()
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card className="c2">
          <Tabs>
            <Tab label="Lunch Roulette">
              <CardHeader
                title="Lunch Roulette"
              />
              <CardText className="cardText">
                <TextField
                  floatingLabelText="Add Choices"
                  className="listText"
                  style={style.card}
                />
                <RaisedButton
                  className="submit"
                  secondary={true}
                  label="Add to List"
                />
                <List>
                  <Subheader>Today</Subheader>
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="In-N-Out"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="Wendys"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="California Fish Grill"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="Ramen"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="Sushi"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText="El Pollo Loco"
                  />
                  <RaisedButton
                    secondary={true}
                    label="It's Lunch Time!"
                    style={style.lunchButton}
                  />
                </List>
              </CardText>
            </Tab>
          <Tab label="Past Lunches">
              <CardText>
                <List>
                  <ListItem
                    rightIconButton={pastMenu}
                    primaryText="Ramen eaten on 6/16 Thursday"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={pastMenu}
                    primaryText="Sushi eaten on 6/15 Wednesday"
                  />
                  <Divider />
                  <ListItem
                    rightIconButton={pastMenu}
                    primaryText="El Pollo Loco eaten on 6/14 Tuesday"
                  />
                </List>
                <RaisedButton
                  secondary={true}
                  label="Reset Lunch Options"
                  style={style.button}
                />
              </CardText>
          </Tab>
        </Tabs>
        </Card>
      </div>
    )
  };

}

module.exports = LunchRoulette;