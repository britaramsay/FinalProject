import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth, provider } from './firebase/firebase.js';
// import { CONSTANTS } from "@firebase/util";

class App extends Component {

  constructor() {
    super()

    this.state = {
      user: null
    }

    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }
  
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        this.setState({user})
      }
    })
  }
  
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        console.log(user)
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render () {  
    return(
      <div>
        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>                
          :
          <button onClick={this.login}>Log In</button>              
        }
       
        {this.state.user ?
          <h4>{this.state.user.displayName} </h4>
          :
          <p>Please log in</p>
        }
      </div>
    )
  }
}

export default App; 