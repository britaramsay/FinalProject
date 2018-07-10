import React, { Component } from "react";
import '../App.css';

class Profile extends Component {

    // Check if user is logged in or out when component mounts
    componentDidMount() {
        console.log(this.props.user)
    }

    render () {  
        return(
      
            <div>
                This is the profile page. Saved Words, uploaded publicly, language
                <p>Click the settings icon to change your language preferences</p>
                <h3>Saved Study Material</h3>
                <h5>Words</h5>
                <p>List with remove icon next to each</p>
                <h5>Stories</h5>
            </div>
        )
    }
}

export default Profile; 