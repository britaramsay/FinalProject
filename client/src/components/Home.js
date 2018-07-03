import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { auth, provider } from './firebase/firebase.js';
// import { CONSTANTS } from "@firebase/util";
// import './App.css';
// import Nav from './components/nav';

class Home extends Component {

  // Check if user is logged in or out when component mounts
  componentDidMount() {
    console.log(this.props.user)
  }

  render () {  
    return(
     
      <div>
       This is the home page. Explain site
      </div>
    )
  }
}

export default Home; 