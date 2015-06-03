var request = require('request');

request({
  url: 'http://registry.npmjs.org/spore-cli',
  json: true
}, function (err, response, body) {
  if(err) throw err;

  if(response.statusCode !== 200) {
    throw new Error("Bad status code: " + response.statusCode);
  }

  if(!body['dist-tags'] || !body['dist-tags'].latest) {
    throw new Error("Unparseable body");
  }

  exports.version = 'v' + body['dist-tags'].latest;
});
