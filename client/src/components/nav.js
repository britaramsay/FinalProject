import React from "react";
import '../App.css';
import { Link } from 'react-router-dom'

const Nav = (props) => {
    return <div>
        <nav className="navbar navbar-light bg-light">
            
            {/* Show correct login/logout button */}
            {props.user ?
                <button onClick={props.logout}>Log Out</button>                
                :
                <img className='googleSignInBtn' onClick={props.login} src='/assets/images/btn_google_signin_light_normal_web.png' alt='google-sign-in'/>       
            }
            {/* Show display name if user is logged in */}
            {props.user ?
                <h4>{props.user.displayName} </h4>
                :
                <p>Please log in</p>
            }
            <Link to="/">Home</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/profile">Profile</Link>

        </nav>
    </div>
}

export default Nav; 