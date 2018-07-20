import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
// import ReactDOM from 'react-dom';

class Story extends Component {
    constructor() {
        super()

        this.state = {
            text: ''
        }
    }
  
    componentDidMount() {
        console.log(this.props)
        this.setState({language: this.props.language})

        var paragraphs = this.props.data.paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)   
        });

        var translatedParagraphs = this.props.data[this.props.language.toLowerCase()].paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)
        })
        console.log(paragraphs)
        this.setState({paragraphs: paragraphs})
        this.setState({translatedParagraphs: translatedParagraphs})
    }

    makeStoryHTML = (element, i) => {
        // console.log(element)
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
        // Define punctuations characters to remove from selected word
        var regex = /[".,?!\s]/g;
        // Replace character with empty string
        var result = e.target.dataset.word.replace(regex, '');
        console.log(result)
        // get definition
        var langCode = ''
        if(this.state.language === 'German')
            langCode = 'deu'
        API.getWordInfo(langCode, result)
            // .then(res => {
            //     console.log(res)
            // })
        // button to save to list
    }

    render () {  
        return(
     
            <div>
                <div className="row auto">
                    <div className="col">
                        <h3 className="title">{this.props.data.title} by {this.props.data.author}</h3>
                    </div>
                    <div className="col">
                        <h3 className="title">{this.props.data[this.props.language.toLowerCase()].title}</h3>
                    </div>
                </div>
                
                <div className='row auto'>
                    <div className='col'>
                        <div className='message focus' id="test">{this.state.paragraphs}</div>
                    </div>
                    <div className='col'>
                        <div className='message success' id='translatedText'>{this.state.translatedParagraphs}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Story; 