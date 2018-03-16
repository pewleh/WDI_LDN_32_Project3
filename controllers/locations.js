const Location = require('../models/location');


function indexRoute(req, res, next) {
  Location.find()
    .then(locations => res.json(locations))
    .catch(next);
}


module.exports = {
  index: indexRoute
};
