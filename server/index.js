const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const populate = require('./modules/populate')
const suv = require('./modules/suv')

app.use(bodyParser.json())

// const router = express.Router()

app.get('/populate', (req, res) => {
  populate.addInElastic((err, results) => {
    res.json(results);
  })
})

app.get('/suv', (req, res) => {
  suv.sortSuv((err, results) => {
    res.json(results)
  })
})

const port = 8000
app.listen(port, () => {
  console.log("Listening on port " + port);
})
