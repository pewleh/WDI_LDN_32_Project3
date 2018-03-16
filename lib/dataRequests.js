const rp = require('request-promise');

function neoAsteroids(req, res, next) {
  // const endpoint = 'https://api.nasa.gov/neo/rest/v1/feed?';
  // const apiKey = process.env.NASA_API_KEY;
  // const date = '2018-03-19';

  rp({
    url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-03-19&api_key=DEMO_KEY',
    json: true
  })
    .then(response => {
      console.log(response);
      return response ;
    })
    .catch(next);
}

module.exports = {
  neoAsteroids
};
