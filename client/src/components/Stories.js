import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import Story from './Story.js';
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

        var stories = []
        API.getStories()
            .then(res => {
                // Set state of unformatted response                
                this.setState({response: res})

                stories = res.data.map(item => {
                    // List languages available in
                    item.available = item.available.map(x => x.language)
                    // Return story information in table format
                    return (
                        <tr key={item._id} id={item._id} data-languages={item.available} onClick={this.onItemClickHandler}>
                            <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                {item.title}
                            </td>
                            <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                {item.author}
                            </td>
                            <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                {item.available}
                            </td>
                        </tr>
                    )
                })
                this.setState({story_titles: stories})
            })
            .catch( err => console.log(err))
    }

    onItemClickHandler = (e) => {
        console.log(e.target.id)
        API.getStory(e.target.id)
            .then(res => {
                this.setState({story: res.data[0]})
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
                
                {this.state.story ? 
                    // If story state is not null, call Story component
                    // TODO: set story state to null when stories link is clicked.
                    // Wont need in this component, only List.
                    <Story data={this.state.story}/>
                    :
                    <div>
                        {this.state.language ? 
                            <List stories={this.state.response} language={this.state.language}/>
                            :
                            <div>
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Already Translated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.story_titles}
                                    </tbody>
                                </table>
                            </div>                              
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Stories; 