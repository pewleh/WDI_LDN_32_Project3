const express = require('express');
const mongoose = require('mongoose');


const router = require('./config/router');
const { dbURI, port } = require('./config/environments');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);

app.use((err, req, res, next) => {
  if(err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessible Entity' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  next();
});

app.listen(port, () => console.log(`We come in peace on ${port}`));

module.exports = app;
