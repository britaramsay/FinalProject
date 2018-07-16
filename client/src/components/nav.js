import React, {Component} from "react";
import '../App.css';
import { Link } from 'react-router-dom';
//, Redirect
import Modal from 'react-modal';

class Nav extends Component {
    constructor() {
        super()

        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        Modal.setAppElement('.fa-cog')
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render () {
        return <div>
        <nav className="navbar navbar-light bg-light">
            
            
            {/* Show display name if user is logged in */}
            <span>
                {this.props.user ? 
                    <h4 id="displayName">{this.props.user.displayName} </h4>
                    :
                    <p></p>
                }
                {/* fix w css? if({this.state.user}) */}
                <i className="fas fa-cog" onClick={this.openModal}></i>
            </span>
            
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link to="/" id="homeLink">Home</Link>| 
                </li>
                <li className="nav-item">
                    <Link to="/stories" id="storiesLink">Stories</Link>|
                </li>
                <li className="nav-item">
                    <Link to="/profile" id="profileLink">Profile</Link>
                </li>
            </ul>
            {/* Show correct login/logout button */}
            {this.props.user ?
                <button className="button outline" onClick={this.props.logout}>Log Out</button>                
                //    <button class="button outline">Button</button>

                :
                <img className='googleSignInBtn' onClick={this.props.login} src='/assets/images/btn_google_signin_light_normal_web.png' alt='google-sign-in'/>       
            }
        </nav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        //   style={customStyles}
          contentLabel="Example Modal"
        >
            {/* Style title and close in span */}
            <h2 ref={subtitle => this.subtitle = subtitle}>Set languages</h2>
            <button onClick={this.closeModal}><i className="fas fa-times"></i></button>
            <div>Choose language(s) to translate automatically</div>
            <form>
                <button>Make</button>
                <button>Some</button>
                <button>Checkboxes</button>
                <br/>
                <button>Save</button>
                {/* Send to db */}
            </form>
        </Modal>
    </div>
    }
}

export default Nav; 