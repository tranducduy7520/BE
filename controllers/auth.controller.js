var md5 = require('md5');
var db = require('../db');

module.exports.login = function (req, res) {
    res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
    var user = db.get('users').find({ email: req.body.email }).value();
    if(!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ]
        });
        values: res.body;
        return;
    }

    var hashedPassword = md5(req.body.password);

    if(user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ]
        });
        return;
    }

    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
}