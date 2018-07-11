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

        var paragraphs = this.props.data.paragraphs.map((element, i) => {

            var wordsArr = element.split(' ')
            var htmlWords = wordsArr.map( (x, index) => {

                var id = i + '-' + index
                
                if(index === wordsArr.length - 1)
                    return (<span key={id} id={id} data-word={x} onClick={this.onItemClickHandler}>{x}<br/></span>)
                else if(index === 0)
                    return (<span key={id} id={id} data-word={x} onClick={this.onItemClickHandler}>&emsp;{x} </span>)
                else
                    return (<span key={id} id={id} data-word={x} onClick={this.onItemClickHandler}>{x} </span>)
            })

            return htmlWords      
        });

        ReactDOM.render(paragraphs, document.getElementById('test'))
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
                <div id="test"></div>
                {/* {this.state.text ?
                    <div></div>
                    :
                    <p></p>
                } */}
            </div>
        )
    }
}

export default Story; 