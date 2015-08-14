var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Story = mongoose.model('stories');



/* GET INDEX items */
router.get('/', function(req, res) {
  Story.findOneRandom(function(err, story){
    // console.log(stories)
    res.render('index', { title: 'LoJ :: Latest', story : story }
    );
  });
});

module.exports = router;
