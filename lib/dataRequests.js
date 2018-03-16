const rp = require('request-promise');

function neoAsteroids(req, res, next) {
  // const endpoint = 'https://api.nasa.gov/neo/rest/v1/feed?';
  // const apiKey = process.env.NASA_API_KEY;
  // const date = '2018-03-19';
  let asteroids = null;
  let datesQueried = null;
  const allEvents = [];

  rp({
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-03-19&api_key=${process.env.NASA_API_KEY}`,
    json: true
  })
    .then(response => {
      asteroids = response;  // all data
      datesQueried = Object.keys(asteroids.near_earth_objects).sort(); // this gives us the dates and sorts them

      datesQueried.forEach( (date, index) => {
        // this creates an array of objects where each object is one days events
        const daysEvents = Object.values(asteroids.near_earth_objects)[index];

        // This assigns each event within that array its matching date
        daysEvents.forEach((event) => event.date = date);

        // this turns each event into an object that we can push into the DB
        daysEvents.forEach((event) => {
          allEvents.push(event);
        });
      });
      return allEvents;
    })
    .catch(next);
}

module.exports = {
  neoAsteroids
};
