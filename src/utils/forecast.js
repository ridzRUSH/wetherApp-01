const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=216b939230b63fdede2b39e5382af4ba&query=${latitude},${longitude}&unit=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      // console.log(response.body.current.feelslike);
      const forcastData = `currently temperature is ${response.body.current.temperature} and feels like ${response.body.current.feelslike}`;

      callback(
        undefined,

        forcastData
      );
    }
  });
};

module.exports = forecast;
