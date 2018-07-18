import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import ReactDOM from 'react-dom';

class List extends Component {
    constructor() {
        super()

        this.state = {

        }
    }
  
    componentDidMount() {
        // Set desired language for later use
        this.setState({language: this.props.language})
        // Get story list html for given props
        var stories = this.getHtml(this.props.stories, this.props.language)
        // Set state stories to list
        this.setState({stories: stories})
    }

    // Will be used for opening story or translating
    onItemClickHandler = (e) => {
        // console.log(e.target.id)
          
        // var action = e.target.id.split('-')
        // if(action[1] == 'read')
        //     API.getBoth(action[2], action[0]) 
        //         .then(res => {
        //             console.log(res)
        //         })
        //         .catch( err => console.log(err))
         // else if(action[1] == 'translate')
               // Call translation API
         
    }

    componentWillReceiveProps = (props) => {
        // console.log(props.stories, props.language)
        var stories = this.getHtml(props.stories, props.language)

        this.setState({stories: stories})
    }

    getHtml = (res, language) => {
        // console.log(res, language)
        var storyClass = '',
            storyId = '';

        var stories = res.data.map(item => {
            // Set property isAvailable if it is already saved in this language
            if(item.available.indexOf(language) !== -1) {
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
                        <button className="button secondary upper outline" id={storyId} onClick={this.onItemClickHandler}>
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
            </div>        
        )
    }
}

export default List; 