import React, { Component } from "react";
import '../App.css';
import API from "../utils/API";
import { auth } from '../firebase/firebase.js';
import $ from 'jquery';

class Profile extends Component {
    constructor() {
        super()

        this.state = {
            title:'',
            author:'',
            private:false
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
                    return <li key={x._id}><span>{x.word} - {x.english.toLowerCase()} </span><span onClick={this.deleteWord} id={x._id}>X</span></li>
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

    handleFileSelect = (e) => {
        console.log(e.target.files)
        var reader = new FileReader()
        // var newDoc = ''
        reader.onload = (read) => {
            var newDoc = read.target.result.split('\n').map(x => x.trim())
            console.log(newDoc)
            this.setState({docBody: newDoc})

        }
        reader.readAsText(e.target.files[0])

    }

    handleInput = (e) => {
        
        var input = e.target.type === "checkbox" ?
            e.target.checked : e.target.value
        console.log(input)
        this.setState({[e.target.name]: input})
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        // ??
        document.getElementById("form").reset();
        API.uploadFile(this.state.user, this.state.title, this.state.author, this.state.docBody, this.state.private)


        this.setState({title: ''})
        this.setState({author: ''})
        this.setState({docBody: ''})
        this.setState({private: false})
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
                
                <div className="row">
                    <div className="col-6">
                        {this.state.language} Vocaulary List
                        <ul>
                            {this.state.words}
                        </ul>
                    </div>
                    <div className="col-6">
                        <form onSubmit={this.handleSubmit} id='form'>
                            Title <input type="text" name="title" value={this.state.title} onChange={this.handleInput} required />
                            Author (Optional) <input type="text" name="author" value={this.state.author} onChange={this.handleInput} />
                            <input type="file" id="files" name="files[]" onChange={this.handleFileSelect} required/>
                            <input type="checkbox" name="private" checked={this.state.private} onChange={this.handleInput} />
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>       
        )
    }
}

export default Profile; 