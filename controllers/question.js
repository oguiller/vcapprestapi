var Question = require('../models/question');

exports.postQuestion = function(req, res) {
        
        var question = new Question();      
        question.text = req.body.text;
        question.index = req.body.index;
        question.active = req.body.active; 
        console.log('Posting Question -> text:' + question.text + ' index: ' + question.index + ' active: ' + question.active);

        question.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Question created!' });
        })
     };

exports.getQuestions = function(req, res) {
        console.log('Getting Questions!!!');
        Question.find(function(err, questions) {
            if (err)
                res.send(err);

            res.json(questions);
        });
        
    };

exports.getQuestion = function(req, res) {
        console.log('Get question: ' + req.params.question_id);
        Question.findById(req.params.question_id, function(err, question) {
            if (err)
                res.send(err);
            res.json(question);
        });
    };

exports.updateQuestion = function(req, res) {
        console.log('Update question: ' + req.params.question_id);
        Question.findById(req.params.question_id, function(err, question) {

            if (err)
                res.send(err);
            
            question.text = req.body.text;
            question.active = req.body.active;
            question.index = req.body.index;

            question.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Question updated!' });
            });
            });
       };

exports.deleteQuestion = function(req, res) {
        console.log('Delete question: ' + req.params.question_id);
        Question.remove({
            _id: req.params.question_id
        }, function(err, question) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    };