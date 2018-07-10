import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";

class Story extends Component {
    constructor() {
        super()

        this.state = {
            text: ''
        }
    }
  
    componentDidMount() {
        // Get shorter ones!!
        // Split
        var paragraphs = this.props.data.paragraphs.map(element => {
            // return element.split(' ').map(x => {
            //     return '<span key='+ x + 'id='+x+'>'+x+'</span>'
            // })+'\n' STIRNG
            var r = element.split(' ').map(x => {
                return (<p></p>)
            })+'\n'
            console.log(r.toString())
            return r            
        });
        console.log(paragraphs.toString())
        this.setState({text: paragraphs.toString()})
    }

    render () {  
        return(
     
            <div>
                
                {this.props.data.title}<br/>
                {this.props.data.author}<br/>
                {this.state.text ?
                    <div>{this.state.text}</div>
                    :
                    <p></p>
                }
            </div>
        )
    }
}

export default Story; 