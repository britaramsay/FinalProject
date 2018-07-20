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
        console.log(this.state.language)

        API.getStories()
            .then(res => {
                this.setState({response: res})
            })
            .catch( err => console.log(err))
    }

    selectLanguage = (e) => {
        var language = e.target.textContent
        // Toggle dropdown after selection
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
                        <List stories={this.state.response} language={this.state.language}/>
                        :
                        <p>choose language</p>
                                               
                    }
                </div>
            </div>
        )
    }
}

export default Stories; 