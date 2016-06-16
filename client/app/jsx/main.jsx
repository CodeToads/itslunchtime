import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers/rootReducer';
import routes from './routes';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {orange400, orange300, orange100, lightGreen500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange400,
    primary2Color: orange300,
    primary2Color: orange100,
    accent1Color: lightGreen500,
  },
  appBar: {
    height: 60,
  },
});

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('App'))
