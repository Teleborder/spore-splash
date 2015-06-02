var express = require('express'),
    app = express(),
    path = require('path'),
    documentation = require('./documentation');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res, next) {
  res.render('index', { index: true });
});

app.get('/documentation', function (req, res, next) {
  res.render('documentation', { documentation: documentation });
});

app.listen(process.env.PORT || 3111);
