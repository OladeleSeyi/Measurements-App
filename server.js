const express = require('express');
const bodyParser = require('body-parser');
// const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// ES6 grabons

// File inclusions
var {mongoose} = require('./db/dbconnect');
var {Customer} = require('./models/customer.js');
// var {customerController} = require('./controllers/customerController');
var birds = require('./birds');

// ENv variables
var port = process.env.PORT || 3000;

var app = express();
// app.use(express.static('public'));
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}))
// Routes and thier responses

// Log all visitors
app.use((req, res, next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log} \n`, (err) => {
    if (err) {
      return console.log('unable to append server logs', err);
    }
    next();
  });
});
// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/dash', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/dash.html'));
});


app.use('/customers', birds)

// app.use('/customers', customerController);

app.listen(port, () => {
  console.log(`App is live on ${port}`);
});


module.exports = {app};
