const db = require("../models/index");
const axios = require('axios')
const translator = require('../client/src/watson-api')
// Defining methods for the booksController
module.exports = {
  language: function (req, res) {  
    console.log(req.params.language)
    res.cookie('language', req.params.language, { maxAge: 900000 });
    console.log(res.cookie.language)

  },
  getLanguage: function (req, res) {  
    console.log(req.cookies)
  },
  findAll: function(req, res) {
    db.English
      .find({})
      .then(model => {
        res.json(model)
      })
      .catch(err => res.status(422).json(err));
  },
  findBoth: function (req, res) {
    console.log(req.params)
    db.English
      .find({_id: req.params.id})
      .populate(req.params.language.toLowerCase())
      .then(dbModel => {
        res.json(dbModel)
      })
  },
  getWordInfo: function (req, res) {  
    console.log(req.params)

    // axios.get("https://glosbe.com/gapi/translate?from="+req.params.language+"&dest=eng&format=json&phrase="+req.params.word+"&pretty=true")
    //     .then(response => {  
    //       var x = response.data.tuc[0]
    //         console.log(x.phrase, x.meanings[0])
    //       // })
    //       // return response.data 
    //       // res.js
    //     })
    //     .catch(err=> console.log(err))
    // res.json('hi')
  },
  translateStory: function (req, res) {  
    // test: req.params.data
    // model_id: 'en-' + req.params.language
    // fr, de, it, ja, ru, es
    db.English
      .find({_id: req.params.id})
      .then(dbModel => {
        // console.log(dbModel)
        var data = dbModel[0].paragraphs
        data.unshift(dbModel[0].title+' ')
        data = data.join('#')
        // console.log(data)
        // res.json(dbModel)
        var lang = ''
        switch(req.params.language) {
          case 'French':
            lang = 'fr'
            break;
          case 'German':
            lang = 'de'
            break;
          case 'Itailan':// spelled wrong
            lang = 'it'
            break;
          case 'Japanese':
            lang = 'ja'
            break;
          case 'Russian':
            lang = 'ru'
            break;
          case 'Spanish':
            lang = 'es'
            break;
        }
        // title not being pushed correctly
        console.log(req.params, lang, dbModel[0].author)
        var parameters = {
          text: data,
          model_id: 'en-'+lang
        };
        console.log(data)
        translator.translate(
          parameters,
          (error, response) => {
            if (error)
              console.log(error)
            else {
              console.log(response.translations[0].translation);
              var translated = response.translations[0].translation
  //       // res = JSON.stringify(response, null, 2)
              var text = translated.split('#')
              var title = text.shift()      
              console.log(text, title, lang)
              
              db[req.params.language]
                .create({title: title, paragraphs: text, author: dbModel[0].author}, (err, item) =>{
                  if(err) console.log(err)
                  else console.log(item)
                })

              //       // SAVE TO STORY
            }
          })
  
      })
      .catch(err => console.log(err));

   

/**
 * id for eng in params -
 * get eng data -
 * dest lang in params -
 * translate data -
 * store data in lang table
 * get id of new object
 * save id column of eng story 
 */

  //     }
  // );
  }
}