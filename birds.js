var express = require('express')
var cors = require('cors')
var router = express.Router()
var {Customer} = require('./models/customer.js')
var ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  var now = new Date();
  var logs = `At ${now}: ${req.method} ${req.url} was querried to the db`;
  fs.appendFile('dblogs', `${logs} \n`, (err) => {
    if (err) {
      console.log('There has been an error',err);
    }
  });

  next()
})
// Get all notes
router.get('/', (req, res) => {
  Customer.find((err, docs) => {
    if (err){
      return console.log('Error in retrieval of docs');
    }
    res.send(docs);
  });
});
// Post New notes
router.post('/', (req, res) => {
  var client = new Customer({
    name: req.body.name,
    length: req.body.length,
    chest: req.body.chest,
    back: req.body.back,
    shoulder: req.body.shoulder,
    sleeve: req.body.sleeve,
    bottom: req.body.bottom,
    trouserlength: req.body.trouserlength,
    waist: req.body.waist,
    inseam: req.body.inseam,
    hips: req.body.hips,
    cuff: req.body.cuff,
    extras: req.body.extras,
    date: req.body.date,
    dueDate: req.body.dueDate
  })
  console.log(req.body);
  client.save().then((doc) => {
    res.send(doc);
    console.log("Doc",doc);
  }, (e) => {
    res.send(400, 'error in transmission',e )
  })
})

// Get data by id
router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send('Please ensure you have a valid entry')
  } else {
    Customer.findOne({
      _id: id
    }).then((client) => {
      if(!client) {
        return res.status(404).send('No such entry');
      }
      res.send(client)
    }).catch((e) => {
      res.status(400).send()
    });
  }
});
// Get Document by name
router.get('/name/:name', (req, res) => {
  var n = req.params.name;
  var name = n.trim();
  if (!name.length>0) {
    res.status(400).send(`The check the ${req.params.name} and ensure its correct`);
  } else {
    Customer.findOne({name}).then((client) => {
      if (!client) {
        return res.status(400).send(`There is no record of ${name}`);
      }

      return res.send(client);
    }).catch((e) => {
      console.log(e);
      res.status(404).send();
    });
  }
});
router.put('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send('No record of given client');
  }
  var client = new Customer({
    name: req.body.name,
    length: req.body.length,
    chest: req.body.chest,
    back: req.body.back,
    shoulder: req.body.shoulder,
    sleeve: req.body.sleeve,
    bottom: req.body.bottom,
    trouserlength: req.body.trouserlength,
    waist: req.body.waist,
    inseam: req.body.inseam,
    hips: req.body.hips,
    cuff: req.body.cuff,
    extras: req.body.extras,
    date: req.body.date,
    dueDate: req.body.dueDate
  });

  Customer.findByIdAndUpdate(req.params.id, {$set: client}, {new: true}, (err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      console.log('Error in saving doc:  ', err);
    }
  });
})

router.delete('/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send(`NO record of given id:  ${id}`);
  }else {
    Customer.findOneAndRemove({_id: id}).then((client) => {
      if (!client) {
        return res.status(400).send(`There is no record of ${name}`);
      }

      return res.send(client);
    }).catch((e) => {
      console.log(e);
      res.status(404).send(e);
    });
  }
});

module.exports = router
