import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers/rootReducer';
import routes from './routes';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {red400, red300, red100, cyanA200} from 'material-ui/styles/colors';
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
    primary1Color: red400,
    primary2Color: red300,
    primary2Color: red100,
    accent1Color: cyanA200,
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
