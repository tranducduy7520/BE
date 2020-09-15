"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var db = require('./db');

var shortid = require('shortid');

var userRoute = require('./routes/user.route'); //CRUD : Create Retrieve Update Delete
// Set some defaults (required if your JSON file is empty)


db.defaults({
  users: []
}).write();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()); // for parsing application/json

app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express["static"]('public'));
app.use('/users', userRoute);
app.listen(3000, function () {
  return console.log('Example app listening on port ${port}!');
});