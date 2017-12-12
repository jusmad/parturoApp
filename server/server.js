var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb://10.22.5.144:27017/events');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(cors());

app.use(function (req, res, next) {
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
app.get('/api/events', function (req, res) {

    console.log("fetching events");
    Event.find(function (err, events) {
        if (err)
            res.send(err)

        res.json(events);
    });
});

app.post('/api/events', function (req, res) {

    console.log("creating event");

    Event.create({
        name: req.body.name,
        place: req.body.place,
        date: req.body.date,
        done: false
    }, function (err, event) {
        if (err)
            res.send(err);

        Event.find(function (err, events) {
            if (err)
                res.send(err)
            res.json(events);
        });
    });

});

app.delete('/api/events/:event_id', function (req, res) {
    Event.remove({
        _id: req.params.event_id
    }, function (err, event) {

    });
});

app.listen(8080);
console.log("App listening on port 8080");