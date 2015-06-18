
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');


var api_nodes = require('./routes/api_nodes');
var api_gateways = require('./routes/api_gateways');
var api_numbers = require('./routes/api_numbers');
var api_headers = require('./routes/api_headers');

var conf_directory = require('./routes/conf_directory');
var conf_dialplan = require('./routes/conf_dialplan');

var orm = require('orm');
var models = require('./database');

var app = express();

// all environments
app.use(orm.express("mysql://worktrybe:jHm693wKQBw6HNzV@voneusmysql02.ckffdl4bvmsr.eu-west-1.rds.amazonaws.com/worktrybe", {define: models}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({keys:['po8erhjD$']}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api/gateways', api_gateways);
app.use('/api/nodes', api_nodes);
app.use('/api/numbers', api_numbers);
app.use('/api/headers', api_headers);
app.use('/conf/dialplan', conf_dialplan);
app.use('/conf/directory', conf_directory);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

