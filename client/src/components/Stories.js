import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import Story from './Story.js';
class Stories extends Component {
    constructor() {
        super()

        this.state = {
            story_titles: []
        }
    }
  
    // Check if user is logged in or out when component mounts
    componentDidMount() {
        this.setState({story: null})
        var stories = []
        API.getStories()
            .then(res => {
                stories = res.data.map(item => {
                    // List languages available in
                    item.available = item.available.map(x => x.language)
                    // Test when multiple are available
                    console.log(item.available)
                    // Return story information in table format
                    return (<tr key={item._id} id={item._id} data-languages={item.available} onClick={this.onItemClickHandler}>
                                <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                    {item.title}
                                </td>
                                <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                    {item.author}
                                </td>
                                <td className="w20" id={item._id} onClick={this.onItemClickHandler}>
                                    {item.available}
                                </td>
                            </tr>)
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

    render () {  
        return(
     
            <div>
                
            {this.state.story ? 
                // If story state is not null, call Story component
                // TODO: set story state to null when stories link is clicked.
                <Story data={this.state.story}/>
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
        )
    }
}

export default Stories; 