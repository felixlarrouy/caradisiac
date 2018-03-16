const {
  getBrands,
  getModels
} = require('node-car-api');
const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

async function getBrand() {
  const brands = await getBrands();
  console.log(brands);
  return brands
}

async function getDetails(brand) {
  const models = await getModels(brand);
  //console.log(models);
  return models
}

let brands = getBrand()
brands.then(function(results) {
  details = []
  for (var i = 0; i < 50; i++) {
    let details = getDetails(results[i])
    details.then(function(details) {
      var cars = []
      for (var j = 0; j < details.length; j++) {
        console.log(details[j]);
        cars.push(details[j])
      }
    })
  }
})

// var body = [];
// for (var i = 0; i < stocks.length; i++ ) {
//     delete stocks[i]._id;
//     var config = { index:  { _index: 'stocks', _type: 'stock', _id: i } };
//     body.push(config);
//     body.push(stocks[i]);
// }
//
// client.bulk({
//     body: body
// }, function (error, response) {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     else {
//         console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
//     }
// });
