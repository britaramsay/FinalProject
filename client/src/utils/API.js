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
  // getBoth: function(id, language) {
  //    return axios.get('/api/stories/'+language+'/'+id)
  // }
}