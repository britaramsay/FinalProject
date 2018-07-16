import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import ReactDOM from 'react-dom';

class Story extends Component {
    constructor() {
        super()

        this.state = {
            text: ''
        }
    }
  
    componentDidMount() {
        console.log(this.props.data.available[0].paragraphs)
        var paragraphs = this.props.data.paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)   
        });

        var translaredParagraphs = this.props.data.available[0].paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)
        })

        ReactDOM.render(paragraphs, document.getElementById('test'))
        ReactDOM.render(translaredParagraphs, document.getElementById('translatedText'))
    }

    makeStoryHTML = (element, i) => {
        var wordsArr = element.split(' ')
        var htmlWords = wordsArr.map( (x, index) => {

            var id = i + '-' + index
            
            // If last word in paragraph, return with a new line
            if(index === wordsArr.length - 1)
                return (<span key={id} data-word={x} onClick={this.onItemClickHandler}>{x}<br/><br/></span>)
            // if first word in the paragraph, add a tab character    
            else if(index === 0)
                return (<span key={id} data-word={x} onClick={this.onItemClickHandler}>&emsp;&emsp;{x} </span>)
            else
                return (<span key={id} data-word={x} onClick={this.onItemClickHandler}>{x} </span>)
        })

        return htmlWords 
    }

    onItemClickHandler = (e) => {
        console.log(e.target.dataset.word)
        // get definition
        // button to save to list
    }

    render () {  
        return(
     
            <div>
                
                {this.props.data.title}<br/>
                {this.props.data.author}<br/>
                <div className='row auto'>
                    <div className='col'>
                        <div className='message' id="test"></div>
                    </div>
                    <div className='col'>
                        <div className='message success' id='translatedText'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Story; 