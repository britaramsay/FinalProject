import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import $ from 'jquery';
import { auth } from '../firebase/firebase.js';

class Story extends Component {
    constructor() {
        super()

        this.state = {
            text: '',
            word: ''
        }
    }
  
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({user: user.uid})
            }
        })

        $('#test').hide()
        // Back to all stories
        $('#test1').html("<a href='/stories'><button className='button secondary upper outline'>Back</button></a>")
        // Set language
        this.setState({language: this.props.language})
        // Make English data into html
        var paragraphs = this.props.data.paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)   
        });
        // Make translated data into html
        var translatedParagraphs = this.props.data[this.props.language.toLowerCase()].paragraphs.map((element, i) => {
            return this.makeStoryHTML(element, i)
        })
        this.setState({paragraphs: paragraphs})
        this.setState({translatedParagraphs: translatedParagraphs})
    }

    makeStoryHTML = (element, i) => {
        // Split each paragraph by words
        var wordsArr = element.split(' ')

        var htmlWords = wordsArr.map( (x, index) => {
            // Assign an id on each word of the paragraph and index in paragraph
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
        console.log(this.state.user)

        // Define punctuations characters to remove from selected word
        var regex = /[".,?!\s]/g;
        // Replace character with empty string
        var result = e.target.dataset.word.replace(regex, '');
        
        this.setState({word: result})
        $('.is-small').removeClass('close').addClass('open')
        // get definition
        API.translateWord(result, this.state.language)
            .then(res =>  this.setState({wordEnglish: res.data}))
    }

    saveWord = (e) => {
        console.log(e.target.id)
        console.log(this.state.user)
        API.saveWord(this.state.user, e.target.id, this.state.language, this.state.wordEnglish)
            .then(res => {
                console.log(res)
                // if have time make book mark filled in if already saved
                $('.fa-bookmark').removeClass('far').addClass('fas')
            })
    }

    render () {  
        return(
     
            <div>
                {this.state.wordEnglish ?
                    <div className="alert" data-kube="alert">
                        {this.state.word} - {this.state.wordEnglish.toLowerCase()} <i className="far fa-bookmark" id={this.state.word} onClick={this.saveWord}></i>
                        <span className="close is-small" data-type="close"></span>
                    </div>
                    :
                    <p></p>
                }
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