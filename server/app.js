
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

var jokes = require ( './routes/jokes.js')

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('server is listening on port ' + app.get('port'));
    });

app.use('/jokes', jokes);


app.get('/*', function (req, res) {
  var file = req.params[0] || '/public/views/index.html';

res.sendFile(path.join(__dirname, '/', file));

});
