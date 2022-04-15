var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://jadmog:testpassword@cluster0.8wjqo.mongodb.net/ticketac?retryWrites=true&w=majority',
  options,
  function (err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
  }
);

var journeySchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number,
});

var journeyModel = mongoose.model('journey', journeySchema);

var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });

});

/* Get Panier page*/
router.get('/panier', async function (req, res, next) {

  if (!req.session.journey) {
    req.session.journey = {};
  }

  if (req.session.panier === undefined) {
    console.log('clean panier', req.session.panier)
    req.session.panier = [];
  }

  console.log(req.session.panier)

  let journey = await journeyModel.findOne({ _id: req.query.journey });

  req.session.panier.push(journey);

  console.log(req.session.panier);
  res.render('panier', { panier: req.session.panier });

});

/* Get  homepage*/
router.get('/homepage', function (req, res, next) {
  res.render('homepage', { title: 'Express' });

});

/* Get available tickets page*/
router.get('/available', function (req, res, next) {
  res.render('available', { panier: req.session.panier });

});

/* post journey info page*/
router.post('/available-selection', async function (req, res, next) {

  if (!req.session.journeyList) {
    req.session.journeyList = [];
  }
  req.session.journeyList = await journeyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date
  });
  console.log('journeyList', req.session.journeyList);
  res.render('available', { journeyList: req.session.journeyList, journeyDay: req.body.date.substring(8), journeyMonth: req.body.date.substring(5, 7) });

});


// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function (req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if (departureCity != arrivalCity) {

      var newUser = new journeyModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function (req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {

    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {

        console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
