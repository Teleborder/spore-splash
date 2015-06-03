var express = require('express'),
    app = express(),
    path = require('path'),
    documentation = require('./documentation'),
    version = require('./version');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res, next) {
  version(function (_err, version) {
    res.render('index', {
      index: true,
      version: version
    });
  });
});

app.get('/documentation', function (req, res, next) {
  res.render('documentation', { documentation: documentation });
});

app.listen(process.env.PORT || 3111);
