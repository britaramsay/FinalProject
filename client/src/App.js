import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, provider } from './firebase/firebase.js';
// import { CONSTANTS } from "@firebase/util";
import './App.css';
import Nav from './components/nav';
import Home from './components/Home';
// import Settings from './components/Settings';
import Stories from './components/Stories';
import Profile from './components/Profile';

class App extends Component {

  constructor() {
    super()

    this.state = {
      user: null
    }
    // bind this to functions
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }
  
  // Check if user is logged in or out when component mounts
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        this.setState({user})
      }
    })
  }

  // Login with firebase Google authentication
  login() {
    auth.signInWithPopup(provider) 
      .then(result => {
        const user = result.user;
        console.log(user)
        this.setState({
          // Set user
          user
        });
      });
  }

  // Logout
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          // Set user to null
          user: null
        });
      });
  }

  render () {  
    return(
     <Router>
      <div>
        <Nav login = {this.login} logout = {this.logout} user = {this.state.user} />
        {/* Disable links if not logged in */}
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/settings" component={Settings} /> */}
          <Route exact path="/stories" component={Stories} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App; 