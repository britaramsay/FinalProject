import React, { Component } from "react";
import '../App.css';
// require("dotenv").config();

class Home extends Component {

    // Check if user is logged in or out when component mounts
    componentDidMount() {
        console.log(this.props.user)
        console.log(process.env.REACT_APP_firebase_api_key)
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