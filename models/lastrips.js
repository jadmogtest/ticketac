var mongoose = require('mongoose')
var journeySchema = require('../routes/index')

var lastripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number,
});

var lastripModel = mongoose.model('lastrip', lastripSchema);

module.exports = lastripModel;