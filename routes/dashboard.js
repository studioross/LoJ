var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var mongoose = require('mongoose');
var Story = mongoose.model('stories');
var Term = mongoose.model('terms');

/* GET stories and terms */
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

/* POST image */
router.post('/dashboard/upload', upload.single('anchor'), function(req, res, next) {
  
});

/* POST term */
router.add = function(req, res) {
  new Term({word : req.body.term, definition : req.body.definition})
  .save(function(err, term){
    console.log(term)
    res.redirect('/dashboard');
  });
};

/* ADD TERM to individual story */
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

/* REMOVE TERM from individual story */
router.removeterm = function(req, res) {
  Story.findById(req.params.storyid, function(err, story) {
    Term.findById(req.params.termid, function(err, term) {
      story.linkedTerms.pull(req.params.termid);
      story.save(function(err, story) {
        console.log(story);
        res.redirect('/dashboard/edit/' + story.id);
      });
    });
  });
};

/* EDIT individual story */
router.edit = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    Term.find(function(err, terms){
      console.log(story);
      res.render('edit', { title: 'LoJ :: Edit Story', story : story, terms : terms, termsAdded : story.linkedTerms });
    });
  });
};

/* UPDATE individual story */
router.update = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    story.text = req.body.contents;
    story.save(function(err, story) {
      console.log(story)
      res.redirect('/dashboard');
    });
  });
};

/* DESTROY story */
router.delete = function(req, res) {
  Story.findById(req.params.id, function(err, story) {
    story.remove(function (err, story) {
      res.redirect('/dashboard');
    });
  });
};

/* DESTROY term */
router.deleteterm = function(req, res) {
  Term.findById(req.params.id, function(err, term) {
    term.remove(function (err, term) {
      res.redirect('/dashboard');
    });
  });
};

/* UNLINK term */


module.exports = router;
