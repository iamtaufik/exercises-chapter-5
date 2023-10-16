var express = require('express');
var logger = require('morgan');

var usersRouter = require('./routes/users.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());

// app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/articles', require('./routes/articles.routes'));

module.exports = app;
