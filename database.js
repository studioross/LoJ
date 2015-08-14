var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema   = mongoose.Schema;

var Story = new Schema({
  title : String,
});
Story.plugin(random);

var Definition = new Schema({
  word : String,
  definition : String,
});

mongoose.model('definitions', Definition);

mongoose.model('stories', Story);

mongoose.connect('mongodb://localhost/loj');
