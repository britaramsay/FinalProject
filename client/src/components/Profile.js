import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import Story from './Story';
import { auth } from '../firebase/firebase.js';
import $ from 'jquery';

class Profile extends Component {
    constructor() {
        super()

        this.state = {

        }
        this.componentCleanup = this.componentCleanup.bind(this);
    }
  
    componentCleanup() { 
        if(document.cookie.indexOf("language") !== -1)
            this.setState({language: document.cookie.substring(document.cookie.indexOf('language=') + 9, document.cookie.length)})
    }
    
    componentWillMount() {
        var lang = document.cookie.substring(document.cookie.indexOf('language=') + 9, document.cookie.length)
        if(document.cookie.indexOf("language") !== -1)
            this.setState({language: lang})

        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({user: user.uid})
                this.getVocab(user.uid, lang)
            }
        })
    }
  
    componentDidMount(){
        window.addEventListener('beforeunload', this.componentCleanup)
        // var lang = document.cookie.substring(document.cookie.indexOf('language=') + 9, document.cookie.length)

        
    }
  
    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup)
    }

    getVocab = (user, lang) => {
        API.getVocab(user, lang)
            .then(res => {
                console.log(res.data)
                var data = res.data.map(x => {
                    return <li key={x._id}><span>{x.word} - {x.english} </span><span onClick={this.deleteWord} id={x._id}>X</span></li>
                })
                this.setState({words: data})
            })
    }

    deleteWord = (e) => {
        console.log(e.target.id)
        // Delete link from vocab of user
    }

    selectLanguage = (e) => {
        var language = e.target.textContent
        auth.onAuthStateChanged(user => {
            if(user) {
                this.setState({user: user.uid})
                this.getVocab(user.uid, language)
            }
        })
        
        document.cookie = "language="+language+";"

        $('#test').click()
        // show selected on screen
        $('#selectedLang').html('<p>' + language + '</p>')
        
        this.setState({language: language})
        this.setState({words : []})
    }

    render () {  
        return(
            
            <div>
                <div className="row auto">
                    <div className="col-3">
                        <div id="test1"></div>
                        <button className="button secondary upper outline" id='test' data-component="dropdown" data-target="#my-dropdown">
                            Choose Language
                            <span className="caret down"></span>
                        </button>
                    </div>
                    <div className="col-6" id="selectedLang">
                        {this.state.language.toUpperCase()}
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
                    {this.state.language} Vocaulary List
                    <ul>
                        {this.state.words}
                    </ul>
                </div>
            </div>       
        )
    }
}

export default Profile; 