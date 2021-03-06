var express = require('express');
var app = express();

require('dotenv').config()

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', function (request, response) {
  var env = process.env.APP_ENV;
  if (env == 'staging') {
    var envName = 'staging'
  } else if (env == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }
  response.set({
    "Content-Security-Policy": "script-src 'self' https://[[RESOURCES]] https://ajax.googleapis.com https://platform.linkedin.com https://www.linkedin.com; frame-src https://www.linkedin.com"
  })
  response.render('index.html', { env: envName });
});

app.listen(app.get('port'), function () {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app
