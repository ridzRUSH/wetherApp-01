const request = require("request");

const geocode = (address, callback) => {
  const url = `https://us1.locationiq.com/v1/search?key=pk.90857c10e0ef430dd0bd7300f1bd2ff2&q=${address}&format=json`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { lat, lon } = response.body[0];

      callback(undefined, {
        latitude: lat,
        longitude: lon,
        location: address,
      });
    }
  });
};

module.exports = geocode;
