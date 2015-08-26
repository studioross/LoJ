var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema   = mongoose.Schema;

var Term = new Schema({
  word : String,
  definition : String,
});

var Story = new Schema({
  text : String,
  linkedTerms: [Term],
  image : String,
});

Story.plugin(random);

mongoose.model('stories', Story);
mongoose.model('terms', Term);

mongoose.connect('mongodb://localhost/loj');
