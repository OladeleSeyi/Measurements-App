const mongoose = require('mongoose');

var Customer = mongoose.model('Customers', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  length: {
    type: String,
    minlength: 1,
    trim: true
  },
  chest: {
    type: String,
    minlength: 1,
    trim: true
  },
  back:{
    type: String,
    minlength: 1,
    trim: true
  },
  shoulder: {
    type: String,
    minlength: 1,
    trim: true
  },
  sleeve: {
    type: String,
    minlength: 1,
    trim: true
  },
  bottom: {
    type: String,
    trim: true
  },
  trouserlength: {
    type: String,
    minlength: 1,
    trim: true
  },
  waist: {
    type: String,
    minlength: 1,
    trim: true
  },
  inseam: {
    type: String,
    minlength: 1,
    trim: true
  },
  hips: {
    type: String,
    minlength: 1,
    trim: true
  },
  cuff: {
    type: String,
    minlength: 1,
    trim: true
  },
  extras: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  dueDate: {
    type: String,
    trim: true
  }
});

module.exports = {Customer};
