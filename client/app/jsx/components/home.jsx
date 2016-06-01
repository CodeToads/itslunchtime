import React, { Component } from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/actions';

class App extends Component {
  render() {
    return (
      <div>
        Welcome to It's Lunch Time.
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