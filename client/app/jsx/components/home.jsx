import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/actions';
import mui from 'material-ui';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader} from 'material-ui/Card';
import List from 'material-ui/List';
const RandomAdds = require('./randomAdds');
const SavedLists = require('./savedLists');

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="It's Lunch Time" />
        <div className="main">
          <RandomAdds />
          <Card className="c2">
            <List>
              test
            </List>
          </Card>
          <SavedLists />
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