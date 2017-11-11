// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://10.22.5.144:27017/events');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Event = mongoose.model('Event', {
    name: String,
    place: String,
    date: Date
});
 
// Routes
 
    // Get events
    app.get('/api/events', function(req, res) {
 
        console.log("fetching events");
 
        // use mongoose to get all events in the database
        Event.find(function(err, events) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(events); // return all events in JSON format
        });
    });
 
    // create event and send back all events after creation
    app.post('/api/events', function(req, res) {
 
        console.log("creating event");
 
        // create a event, information comes from request from Ionic
        Event.create({
            name : req.body.name,
            place : req.body.place,
            date: req.body.date,
            done : false
        }, function(err, event) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Event.find(function(err, events) {
                if (err)
                    res.send(err)
                res.json(events);
            });
        });
 
    });
 
    // delete a event
    app.delete('/api/events/:event_id', function(req, res) {
        Event.remove({
            _id : req.params.event_id
        }, function(err, event) {
 
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");