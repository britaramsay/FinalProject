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
        var stories = []
        API.getStories()
            .then(res => {
                stories = res.data.map(item => {
                    item.available = item.available.map(x => x.language)
                    console.log(item.available)
                    return (<p key={item._id} id={item._id} data-languages={item.available} onClick={this.onItemClickHandler}>{item.title} by {item.author} | {item.available}</p>)
                })
                this.setState({story_titles: stories})
            })
            .catch( err => console.log(err))
        
    }
//<a href={'api/stories/'+item._id} > 
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
                <Story data={this.state.story}/>
                :
                <div>{this.state.story_titles}</div>        
            }
                
            </div>
        )
    }
}

export default Stories; 