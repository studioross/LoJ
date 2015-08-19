var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema   = mongoose.Schema;

var Story = new Schema({
  text : String,
});
Story.plugin(random);

var Term = new Schema({
  word : String,
  definition : String,
});

mongoose.model('stories', Story);
mongoose.model('terms', Term);

mongoose.connect('mongodb://localhost/loj');
