import React, { Component } from "react";
import '../App.css';

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