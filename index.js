require('dotenv').config();
// console.log(process.env);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
const shortid = require('shortid');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var cookieParser = require('cookie-parser');

var authMiddleware = require('./middleware/auth.middleware');
//CRUD : Create Retrieve Update Delete

// Set some defaults (required if your JSON file is empty)
db.defaults({
        users: []
    })
    .write();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(3000, () => console.log('Example app listening on port ${port}!'));