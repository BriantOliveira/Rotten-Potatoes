//Calling dependecies

//Calling Express
var express = require('express');
//connecting localhost
var port = process.env.PORT || 30000;
//Calling app
var app = express();
//calling handlebars
var exphbs = require('express-handlebars');

//Setting database
var mongodb = require('mongodb');
var mongoose = require('mongoose');

//Initializing body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));



app.get('/', function(req, res) {
   res.send('Hello World!')
});

app.get('/', function (req, res) {
    res.render('home', {msg: 'Hello World!'});
});

//MOCK ARRAY OF PROJECT
// var reviews = [
//     { title: "Great Review"}
//     { title: "Next Review"}
// ]

//Index
app.get('/', function(req, res) {
    // res.render('reviews-index', {reviews: reviews});
    Review.find(function(err, reviews) {
        res.render('reviews-index', {reviews: reviews});
    })
});

//Use bluebird
mongoose.Promise = require('bluebird');
//Connection to the database
mongoose.connect(process.env.MONGOODB_URI || 'mongodb://localhost/rotten-potatoes', {
    useMongoClient: true,
});

var Reviews = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

//Setting up templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {msg: 'Hello World!'});
});

app.get('/reviews/new', function(req, res) {
    res.render('reviews-new', {});
})

//Create
app.post('/reviews', function (req, res) {
    Reviews.create(req.body, function(err, review) {
        console.log(review);

        res.render('/');
        // res.render('review-index');
    })
    // res.render('reviews-new', {});
})


app.listen(port);
console.log('You are connected to ' + port);
