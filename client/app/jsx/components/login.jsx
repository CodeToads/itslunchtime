import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const iconStyles = {
  width: '24px',
  height: '24px'
}

const Google = (props) => (
  <SvgIcon {...props}>
    <path fill="#000000" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
  </SvgIcon>
);

const Facebook = (props) => (
  <SvgIcon {...props}>
    <path fill="#000000" d="M19,4V7H17A1,1 0 0,0 16,8V10H19V13H16V20H13V13H11V10H13V7.5C13,5.56 14.57,4 16.5,4M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
  </SvgIcon>
);

const Twitter = (props) => (
  <SvgIcon {...props}>
    <path fill="#000000" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
  </SvgIcon>
);

const GoogProvider = new firebase.auth.GoogleAuthProvider();
const FBProvider = new firebase.auth.FacebookAuthProvider();
const TwitProvider = new firebase.auth.TwitterAuthProvider();

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      signedIn: '',
      name: '',
      uuid: '',
      photoUrl: ''
    };
  }

  componentDidMount() {
    //refactor providers later
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('user is signed in');
        this.setState = {
          signedIn: true,
          name: user.displayName,
          uuid: user.uid ,
          photoUrl: user.photoURL
        }
      } else {
        // No user is signed in.
        console.log('user is not signed in');
        this.setState = {
          signedIn: false,
        }
      }
    });
  }
  _login(provider) {
    this._handleToggle();
    console.log(`logging in with ${provider}`);
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log('this is the user');
      console.log(user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode);
    });
  }

  _signout() {
    this._handleToggle();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('signout successful');
    }, function(error) {
      // An error happened.
      console.log('signout failed');
    });
  }

  _handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <RaisedButton 
          className="login" 
          label="Login/Sign up" 
          secondary={true}
          onTouchTap={this._handleToggle.bind(this)}
        />
        <Drawer 
          open={this.state.open}
          openSecondary={true}
        >
          <AppBar 
            title="Sign In" 
            iconElementLeft={
              <IconButton onClick={this._handleToggle.bind(this)}><NavigationClose /></IconButton>
            }
            onTitleTouchTap={this._handleToggle.bind(this)}
          />
          <MenuItem leftIcon={<Google />} onTouchTap={this._login.bind(this, GoogProvider)}>Google</MenuItem>
          <MenuItem leftIcon={<Facebook />} onTouchTap={this._login.bind(this, FBProvider)}>Facebook</MenuItem>
          <MenuItem leftIcon={<Twitter />} onTouchTap={this._login.bind(this, TwitProvider)}>Twitter</MenuItem>
          <RaisedButton 
            className="submit" 
            label="Sign Out" 
            secondary={true}
            onTouchTap={this._signout.bind(this)}
          />
        </Drawer>
      </div>
    );
  }
}

module.exports = Login;