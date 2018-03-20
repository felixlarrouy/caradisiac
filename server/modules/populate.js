const {
  getBrands,
  getModels
} = require('node-car-api');

const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

function headerElasticSearch(id) {
  return
}


function addIndexElastic(tab) {
  var indexedData = []
  for (var i in tab) {
    indexedData.push({
      index: {
        _index: 'cars',
        _type: 'car',
        _id: i
      }
    })
    indexedData.push(tab[i])
  }
  console.log(indexedData)
  client.bulk({
    body: indexedData
  }, function(err, resp) {

  });
}

exports.addInElastic = (callback) => {
  console.log("Scrapping models...");
  getBrands().then(function(brands) {
    let promises = []
    for (var i = 0; i < brands.length; i++) {
      console.log(brands[i]);
      promises.push(getModels(brands[i]))
    }
    Promise.all(promises).then(function(models) {
      var cars = []
      for (var i = 0; i < models.length; i++) {
        cars = cars.concat(models[i])
      }
      addIndexElastic(cars)
      return callback(null, cars)
    })
  })
}