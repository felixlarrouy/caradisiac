const elasticsearch = require('elasticsearch');
const es = require('./es')

var client = es.client

exports.sortSuv = (callback) => {
  client.search({
    index: 'cars',
    type: 'car',
    body: {
      sort: {
        volume: {
          order: 'desc'
        }
      }
    }
  }).then(function(resp) {
    var hits = resp.hits.hits;
    return callback(null, hits)
  }, function(err) {
    console.trace(err.message)
  })
}
