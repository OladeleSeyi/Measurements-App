var express = require('express')
var router = express.Router()
// var {Customer} = require('../models/customer');
console.log('customer module');



// router.get('/', (req, res) => {
//   Customer.find((err, docs) => {
//     if (err){
//       return console.log('Error in retrieval of docs');
//     }
//     res.send(docs);
//   });
// });
// router.post('/', (req, res) => {
//   var client = new Customer({
//     name: req.body.name,
//     length: req.body.length,
//     chest: req.body.chest,
//     back: req.body.back,
//     shoulder: req.body.shoulder,
//     sleeve: req.body.sleeve,
//     bottom: req.body.bottom,
//     trouserlength: req.body.trouserlength,
//     waist: req.body.waist,
//     inseam: req.body.inseam,
//     hips: req.body.hips,
//     cuff: req.body.cuff,
//     extras: req.body.extras
//   })
//   client.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send('error in transmission',e)
//   })
// })

module.exports = {router};
