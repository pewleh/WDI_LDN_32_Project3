const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const router = require('./config/router');
const { dbURI } = require('./config/environments');


mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));
app.use(router);

app.listen(port, () => console.log(`Up and running on port ${port}`));
