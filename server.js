const express = require("express"),
      path = require("path"),
      bodyParser = require("body-parser"),
      PORT = process.env.PORT || 3001,
      app = express(),
      mongoose = require("mongoose"),
      apiRoutes = require("./routes"),
      cookieParser = require('cookie-parser');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use apiRoutes
app.use(apiRoutes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stories");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test_stories");

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
