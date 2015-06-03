var request = require('request'),
    lastVersion = "";

module.exports = function (callback) {
  request({
    url: 'http://registry.npmjs.org/spore-cli',
    json: true
  }, function (err, response, body) {
    if(err) {
      console.error(err);
      return callback(null, lastVersion);
    }

    if(response.statusCode !== 200) {
      console.error(new Error("Bad status code: " + response.statusCode));
      return callback(null, lastVersion);
    }

    if(!body['dist-tags'] || !body['dist-tags'].latest) {
      console.error(new Error("Unparseable body"));
      return callback(null, lastVersion);
    }

    lastVersion = 'v' + body['dist-tags'].latest;

    callback(null, lastVersion);
  });
};
