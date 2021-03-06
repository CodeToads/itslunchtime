import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/actions';
import mui from 'material-ui';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader} from 'material-ui/Card';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';

const RandomAdds = require('./randomAdds');
const SavedLists = require('./savedLists');
const LunchRoulette = require('./LunchRoulette');
const Login = require('./Login');

class App extends Component {

  render() {
    return (
      <div>
        <AppBar title="It's Lunch Time" 
          children={<Login />}
          showMenuIconButton={false}
          iconElementLeft={<IconButton></IconButton>}
        />
        <div className="left">
          <RandomAdds />
          <SavedLists />
        </div>
        <div className="right">
          <LunchRoulette />
        </div>
        <p>{this.props.phrase}</p>
        <button onClick={this.props.test}>press me</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { phrase: state.main.phrase };
}

export default connect(mapStateToProps, { test })(App);