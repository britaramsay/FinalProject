import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
// import ReactDOM from 'react-dom';
import Story from './Story'

class List extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
  
    componentDidMount() {
        console.log('change')
        // Set desired language for later use
        this.setState({language: this.props.language})
        // Get story list html for given props
        API.getStories()
            .then(res => {
                this.setState({response: res})
                this.setState({stories: this.getHtml(res, this.props.language)})
            })
            .catch( err => console.log(err))
        // var stories = this.getHtml(this.props.stories, this.props.language)
        // // Set state stories to list
        // this.setState({stories: stories})
    }

    // Will be used for opening story or translating
    getStories = (e) => {
        console.log(this.state.language)
          
        var action = e.target.id.split('-')
        if(action[1] === 'read') {
            API.getBoth(action[0], action[2]) 
                .then(res => {
                    console.log(res)
                    this.setState({story: res.data[0]})
                })
                .catch( err => console.log(err))
                
        }
        else if(action[1] === 'translate') {
            API.translate(action[0], action[2])
                .then(res => {
                    console.log(res)
                    // this.setState({story: res.data[0]})
                })
                .catch( err => console.log(err))
                    // this.setState({story: res.data[0]})
        }
    }

    componentWillReceiveProps = (props) => {
        console.log(props.language)
        this.setState({language: props.language})

        var stories = this.getHtml(this.state.response, props.language)

        this.setState({stories: stories})
    }

    getHtml = (res, language) => {
        console.log(res, language)
        var storyId = '';

        var stories = res.data.map(item => {
            console.log(language)

            // Set property isAvailable if it is already saved in this language
            if(item.hasOwnProperty(language.toLowerCase())) {
                item.isAvailable = 'Read in ' + language
                storyId = item._id + '-read-' + language
            }
            else {
                item.isAvailable = 'Translate'
                storyId = item._id + '-translate-' + language
            }

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
                        <button className="button secondary upper outline" id={storyId} onClick={this.getStories}>
                            {item.isAvailable}
                        </button>
                        {/* // Make button, class either read or translate, make id story id and language */}
                    </td>
                </tr>
            )
        })
        return stories      
    }

    render () {  
        return(
            <div>
                {this.state.story ? 
                    <Story data={this.state.story} language={this.state.language}/>
                    :
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Already Translated</th>
                            </tr>
                        </thead>
                            <tbody>
                                {this.state.stories}
                            </tbody>
                    </table>
                }
                
            </div>        
        )
    }
}

export default List; 