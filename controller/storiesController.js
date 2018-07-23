const db = require("../models/index");
const axios = require('axios')
const translator = require('../client/src/watson-api')
// Defining methods for the booksController
module.exports = {
  newUser: function(req, res) {
    // console.log(req.params.uid)
    db.User
      .find({uid: req.params.uid})
      .then(user => {
        console.log(user)
        if(user = []) {
          db.User
            .create({uid: req.params.uid}, (err, newUser) => {
              if(err) console.log(err)
              else console.log(newUser)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, //vv unneeded
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
      .find({$or: [{uid: req.params.id}, {private: false}]})
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
  saveWord: function (req, res) {  
    console.log(req.params)

    db.Vocab
      .findOne({
          language: req.params.language, 
          word: req.params.word
        },(err, word) => {
          if(word) {
            db.User 
              .findOneAndUpdate( {uid: req.params.uid},
                { $push: { vocab: word._id } },
                (err, model) => {
                  if(err) console.log(err)
                  else res.json('saved')
                }
              )
          } 
          else {
            db.Vocab.create({
              language: req.params.language, 
              word: req.params.word, 
              english: req.params.english
            }, (err, newVocab) => {
              console.log(newVocab._id, req.params.uid)
              db.User 
                .findOneAndUpdate( {uid: req.params.uid},
                  { $push: { vocab: newVocab._id } },
                  (err, model) => {
                    if(err) console.log(err)
                    else res.json('saved')
                  }
                )
            })
          }
           
        })

    // axios.get("https://glosbe.com/gapi/translate?from="+req.params.language+"&dest=eng&format=json&phrase="+req.params.word+"&pretty=true")
    //     .then(response => {  
    //       var x = response.data.tuc[0]
    //         console.log(x.phrase, x.meanings[0])
    //       // })
    //       // return response.data 
    //       // res.js
    //     })
    //     .catch(err=> console.log(err))
    // res.json('saved')
  },
  translateStory: function (req, res) {  
    // fr, de, it, ja, ru, es
    db.English
      .find({_id: req.params.id})
      .then(dbModel => {
        var data = dbModel[0].paragraphs
        data.unshift(dbModel[0].title+' ')
        data = data.join('#')
       
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
        var parameters = {
          text: data,
          model_id: 'en-'+lang
        };
        translator.translate(
          parameters,
          (error, response) => {
            if (error)
              console.log(error)
            else {
              var translated = response.translations[0].translation
              var text = translated.split('#')
              var title = text.shift()      
              
              db[req.params.language]
                .create({title: title, paragraphs: text, author: dbModel[0].author}, (err, item) =>{
                  if(err) console.log(err)
                  else {
                    var query = {}
                    query[req.params.language.toLowerCase()] = item._id

                    db.English
                      .update({_id: req.params.id}, query, (err, affected, resp) => {
                        console.log(resp)
                      })
                      res.json('saved')
                  }
                })
            }
          })
      })
      .catch(err => console.log(err));
  },
  translateWord: function (req, res) { 
    console.log(req.params.language) 
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
    console.log(lang+'-en')
    var parameters = {
      text: req.params.word,
      model_id: lang+'-en'
    };
    translator.translate(
      parameters,
      (error, response) => {
        if (error)
          console.log(error)
        else {
          var translated = response.translations[0].translation
          res.json(translated)
        }
      })
  },
  getVocab: function(req, res) {
    console.log(req.params)
    db.User
      .findOne({uid: req.params.user})
      .populate('vocab')
      .then(dbModel => {
        var vocab = dbModel.vocab.filter( word => word.language == req.params.language)
        res.json(vocab)
      })
  },
  uploadDoc: function (req, res) {  
    console.log(req.params, req.body)
    var doc = req.body.filter(x => x.length > 0)
    db.English
      .create({
        title: req.params.title,
        author: req.params.author,
        paragraphs: doc,
        uid: req.params.user,
        private: req.params.privat
      }).then((err, neww) => {
        if(err) console.log(err)
        else res.json(neww)
      })
  }
  //,getMine()
}