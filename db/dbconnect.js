const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/measurements').catch((e) => {
  console.log(e);
});
