var User = require('../models/user');

exports.postUser = function(req, res) {
        console.log(req.body);
        var user = new User();      
        user.username = req.body.username;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.password = req.body.password;
        user.email = req.body.email; 

        console.log('Posting User: ' + user.username + ' email: ' + user.email + ' password: ' + user.password);

        if(typeof user.password == 'undefined'){
            res.send({ message: 'Password is a compulsory field'});
        }    

        if(user.password.length < 8){
            res.send({ message: 'Password min length is 8 characters' });
        }
        
        user.save(function(err) {
            if (err)
                res.send(err);
                res.json({ message: 'User created!' });
            })      
};

exports.getUsers = function(req, res) {
        console.log('Getting Users!!!');
        User.find(req.params.name, function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    };

exports.getUser = function(req, res) {
        console.log('Get User: ' + req.params.user_id);
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };

exports.updateUser = function(req, res) {
        console.log('Update User: ' + req.params.user_id);
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);
            
            user.username = req.body.username;
            question.name = req.body.name;
            question.surname = req.body.surname;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });
            });
       };

exports.deleteUser = function(req, res) {
        console.log('Deleting User: ' + req.params.user_id);
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    };