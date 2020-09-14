var db = require('../db');
const shortid = require('shortid');

module.exports = {
    index: function (req, res) {
        res.render('users/index', {
            users: db.get('users').value()
        });
    },
    search: function (req, res) {
        var q = req.query.q;
        var matchUser = db.get('users').value().filter(function (user) {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
        })
        res.render('users/index', {
            users: matchUser,
            query: q
        })
    },
    create: function (req, res) {
        res.render('users/create');
    },
    view: function (req, res) {
        var id = req.params.id;  //route parameter
    
        var user = db.get('users').find({id: id}).value();
        res.render('users/view', {
            user: user
        })
    },
    postCreate: function (req, res) {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }
}