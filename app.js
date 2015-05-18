var express = require('express');
var app = express();
var client = require('./models/clientRedis.js');

client.connect;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var userRouter = require('./routes/user.js');
var bookRouter = require('./routes/book.js');

app.use(cookieParser());
app.use(session({secret: 'phidang'}));
app.use(bodyParser.urlencoded());



app.use('/apiTestPage', express.static(__dirname + '/apiTestPage'));
app.get('/', function (req, res) {
	res.redirect('/apiTestPage/');
});

app.use('/user', userRouter);
app.use('/book', bookRouter);

app.listen(3000);