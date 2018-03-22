const rp = require('request-promise');

function addWeather(array) {
  array.forEach(place => {
    place.weather = { data: 'none'};
    // get weather for the place
    rp({
      url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${place.location.lat},${place.location.lng}`,
      qs: { units: 'si' },
      json: true
    })
      .then(response => place.weather = response.daily); // Attach daily weather data to the place.
  });
  console.log(array);
  return array;
}

module.exports = {
  addWeather: addWeather
};
