var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var Story = mongoose.model('stories');
var Term = mongoose.model('terms');

/* GET items */
router.get('/', function(req, res) {
  Story.find(function(err, stories){
    // console.log(stories)
    Term.find(function(err, terms){
      //console.log(terms)
      res.render('dashboard', { title: 'LoJ :: Dashboard', stories : stories, terms : terms });
    });
  });
});

/* POST story */
router.post('/', function(req, res) {
  new Story({text : req.body.contents})
  .save(function(err, story){
    console.log(story)
    res.redirect('/dashboard');
  });
});

/* POST term */
router.add = function(req, res) {
  new Term({word : req.body.term, definition : req.body.definition})
  .save(function(err, term){
    console.log(term)
    res.redirect('/dashboard');
  });
};

/* ADD TERM to individual item */
router.addterm = function(req, res) {
  Story.findById(req.params.storyid, function(err, story) {
    Term.findById(req.params.termid, function(err, term) {
      story.linkedTerms.push({ word : term.word, definition : term.definition });
      story.save(function(err, story) {
        console.log(story);
        res.redirect('/dashboard/edit/' + story.id);
      });
    });
  });
};

/* EDIT individual item */
router.edit = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    Term.find(function(err, terms){
      console.log(story)
      res.render('edit', { title: 'LoJ :: Edit Story', story : story, linkedTerms : story.linkedTerms, terms : terms });
    });
  });
};

/* UPDATE individual item */
router.update = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    story.text = req.body.contents;
    story.save(function(err, story) {
      console.log(story)
      res.redirect('/dashboard');
    });
  });
};

/* ADD TERMS to individual item
router.assign = function(req, res) {

  Term.findById(req.params.id, function(err, term) {
    term.linkedStories.
    console.log(term)
  });
};
*/

/* DESTROY items */
router.delete = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    story.remove(function (err, story) {
      res.redirect('/dashboard');
    });
  });
};

router.deleteterm = function(req, res) {
  Term.findById(req.params.id, function(err, term) {
    term.remove(function (err, term) {
      res.redirect('/dashboard');
    });
  });
};

module.exports = router;
