import React, {Component} from "react";
import '../App.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

// const Nav = (props) => {
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
        Modal.setAppElement('#settings')

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
    // return <div>
    render () {
        return <div>
        <nav className="navbar navbar-light bg-light">
            
            {/* Show correct login/logout button */}
            {this.props.user ?
                <button onClick={this.props.logout}>Log Out</button>                
                :
                <img className='googleSignInBtn' onClick={this.props.login} src='/assets/images/btn_google_signin_light_normal_web.png' alt='google-sign-in'/>       
            }
            {/* Show display name if user is logged in */}
            <span>
            {this.props.user ?
                <h4 id="displayName">{this.props.user.displayName} </h4>
                :
                <p>Please log in</p>
            }
            <i className="fas fa-cog" id="settings" onClick={this.openModal}></i>
            </span>
            <Link to="/">Home</Link>
            <Link to="/stories">Stories</Link>
            <Link to="/profile">Profile</Link>
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
          <button onClick={this.closeModal}><i class="fas fa-times"></i></button>
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