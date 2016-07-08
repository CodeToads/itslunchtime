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
import Firebase from 'firebase';
import _ from 'lodash';
import ReactFire from 'reactfire';
import reactMixin from 'react-mixin';

var moment = require('moment');

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

class LunchRoulette extends React.Component {
  constructor() {
    super()
    this.state = {
      lunches: [],
      eaten: [],
      input: ''
    };
  }

  componentDidMount() {
    //listen for lunch data changes
    this.fireDB = firebase.database();

    this.fireDBLunches = this.fireDB.ref("lunches");
    this.bindAsArray(this.fireDBLunches, "lunches");

    this.fireDBEaten = this.fireDB.ref("eaten");
    this.bindAsArray(this.fireDBEaten, "eaten");  
  }

  componentWillUnmount() {
    this.unbind('lunches');
    this.unbind('eaten');
  }

  //event when enter is pressed on input
  _addLunch(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.fireDBLunches.push({
        name: event.target.value
      });
      //clean input
      this.setState({
        input: ''
      });
      console.log(`Should have added ${event.target.value}`);
    }
  }

  //button to add to list
  _submitLunch(event) {
    //adds to database if input is not blank
    if (this.state.input !== '') {
      this.fireDBLunches.push({
        name: this.state.input
      });
      //clean input
      this.setState({
        input: ''
      });
    }
  }

  _removeLunch(event) {
    //query using event['.key'] to find correct entry and remove it
    this.fireDB.ref("lunches/" + event['.key']).remove();
  }

  _removeEaten(event) {
    //query using event['.key'] to find correct entry and remove it
    this.fireDB.ref("eaten/" + event['.key']).remove();
  }

  _sendToLunch(event) {
    //add to eaten ref
    this.fireDBLunches.push({
      name: event.name,
    })
    //query using event['.key'] to find correct entry and remove it
    this.fireDB.ref("eaten/" + event['.key']).remove();
  }

  _sendToEaten(event) {
    //add to eaten ref
    this.fireDBEaten.push({
      name: event.name,
      date: moment().format('dddd (MM/DD)')
    })
    //query using event['.key'] to find correct entry and remove it
    this.fireDB.ref("lunches/" + event['.key']).remove();
  }

  //handles choices input change
  _handleInputChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    //button and menu components
    const iconButtonElement = (
      <IconButton
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    //iterate through lunch nodes and map item with divider
    var lunchNodes = this.state.lunches.map((lunches, i) => {
      return (
        <div key={i}>
        <ListItem
          rightIconButton={(
            <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem primaryText="Send to Eaten" 
              onTouchTap={
                this._sendToEaten.bind(this, lunches)
              }
            />
            <MenuItem primaryText="Delete" 
              onTouchTap={
                //bind this and lunches to function
                this._removeLunch.bind(this, lunches)
              }
              />
            </IconMenu>
          )}
          primaryText={lunches.name}
        />
        <Divider />
        </div>
      );
    });

    //iterate through eaten and map item with divider
    var eatenNodes = this.state.eaten.map((lunches, i) => {
      return (
        <div key={i}>
          <ListItem
            rightIconButton={(
              <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem primaryText="Send back to Roulette"
                  onTouchTap={
                    this._sendToLunch.bind(this, lunches)
                  }
                />
                <MenuItem primaryText="Delete" 
                  onTouchTap={
                    this._removeEaten.bind(this, lunches)
                  }
                />
              </IconMenu>
            )}
            primaryText={`${lunches.name} was eaten on ${lunches.date}`}
          />
          <Divider />
        </div>
      );
    });

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
                  onKeyDown={this._addLunch.bind(this)}
                  value={this.state.input}
                  onChange={this._handleInputChange.bind(this)}
                />
                <RaisedButton
                  className="submit"
                  secondary={true}
                  label="Add to List"
                  onMouseDown={this._submitLunch.bind(this)}
                />
                <List>
                  <Subheader>Lunch List</Subheader>
                  {lunchNodes}
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
                  {eatenNodes}
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

reactMixin(LunchRoulette.prototype, ReactFire)

module.exports = LunchRoulette;