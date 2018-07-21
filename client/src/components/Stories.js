import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
// import Story from './Story.js';
import List from './List.js';
import $ from 'jquery'; 

class Stories extends Component {
    constructor() {
        super()

        this.state = {
            // For all stories returned
            story_titles: []
        }
    }
  
    // Check if user is logged in or out when component mounts
    componentDidMount() {
        console.log(this.props)
        API.getStories()
            .then(res => {
                this.setState({response: res})

                if(document.cookie.indexOf("language") !== -1)
                    this.setState({language: document.cookie.substring(document.cookie.indexOf('language=') + 9, document.cookie.length)})
            })
            .catch( err => console.log(err))
    }

    selectLanguage = (e) => {
        console.log(this.state.user)

        var language = e.target.textContent
        
        document.cookie = "language="+language+";"

        $('#test').click()
        // show selected on screen
        $('#selectedLang').html('<p>' + language + '</p>')
        
        this.setState({language: language})
    }

    render () {  
        return(
     
            <div>
                <div className="row auto">
                    <div className="col-3">
                        <div id="test1"></div>
                        <button className="button secondary upper outline" id='test' data-component="dropdown" data-target="#my-dropdown">
                            Choose Language
                            <span className="caret down"></span>
                        </button>
                    </div>
                    <div className="col-6" id="selectedLang">
                    </div>
                </div>
                
                <div className="dropdown hide" id="my-dropdown">
                    <a href="" className="close show-sm"></a>
                    <ul>
                        <li className="muted" onClick={this.selectLanguage}>French</li>
                        <li className="muted" onClick={this.selectLanguage}>German</li>
                        <li className="muted" onClick={this.selectLanguage}>Itailan</li>
                        <li className="muted" onClick={this.selectLanguage}>Japanese</li>
                        <li className="muted" onClick={this.selectLanguage}>Russian</li>
                        <li className="muted" onClick={this.selectLanguage}>Spanish</li>
                        {/* // More? */}
                    </ul>
                </div>
                
                <div>
                    {this.state.language ? 
                        <List language={this.state.language}/>

                        // <List stories={this.state.response} language={this.state.language}/>
                        :
                        <p>choose language</p>
                                               
                    }
                </div>
            </div>
        )
    }
}

export default Stories; 