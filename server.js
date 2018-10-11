const express = require('express');


// ENv variables
var port = process.env.PORT || 3000
var app = express();

// Routes and thier responses











app.listen(port, () => {
  console.log(`App is live on ${port}`);
});

module.exports = {app};
