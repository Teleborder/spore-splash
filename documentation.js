var fs = require('fs'),
    path = require('path'),
    marked = require('marked'),
    documentation = fs.readFileSync(path.resolve(__dirname, './views', 'documentation.md'), { encoding: 'utf8' });

module.exports = marked(documentation);
