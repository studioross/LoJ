var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema   = mongoose.Schema;

var Term = new Schema({
  word : String,
  definition : String,
  //linkedStories : [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

var Story = new Schema({
  text : String,
  //linkedTerms : [{ type: Schema.Types.ObjectId, ref: 'Term' }],
  linkedTerms: [Term]
});

Story.plugin(random);

mongoose.model('stories', Story);
mongoose.model('terms', Term);

mongoose.connect('mongodb://localhost/loj');
