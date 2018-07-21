import axios from "axios";

export default {
  // Gets all books
  getStories: function() {
    return axios.get("/api/stories");
  },
  getStory: function(id) {
    return axios.get("/api/stories/"+id);
  },
  // this is just for getting ones already in db
  getBoth: function(id, language) {
    console.log(id, language)
    return axios.get('/api/stories/'+id+'/'+language)
  },
  getWordInfo: function (language, word) {  
    console.log(language, word)
    return axios.get('/api/stories/definition/'+language+'/'+word)
  },
  translate: function (id, language) {  
    return axios.get('/api/stories/translate/'+id+'/'+language)
  },
  setLanguage: function (language) {  
    console.log('api' + language)
    return axios.get('/api/stories/set/language/' + language)
  },
  getLanguage: function () {  
    return axios.get('/api/stories/getLanguage')
  },
  addUser: function (uid) {  
    return axios.get('/api/stories/new/user/' + uid)
  },
  saveWord: function (uid, word, lang, english) {  
    console.log(uid, word, english)
    return axios.get('/api/stories/save/word/'+uid+'/'+word+'/'+lang+'/'+english)
  },
  translateWord: function (word, language) {  
    return axios.get('/api/stories/translate/word/'+word+'/'+language)
  },
  getVocab: function (user, language) {  
    return axios.get('/api/stories/profile/'+user+'/'+language)
  }
}