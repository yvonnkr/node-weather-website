const request = require('request');

// //&lang=tr (turkish)

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ea084bdf61ef7bbd9a85b9d3d2438ed3/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { currently, daily } = body;
      const { precipProbability, temperature } = currently;
      callback(
        undefined,
        `${daily.data[0].summary} With a high of ${
          daily.data[0].temperatureHigh
        } and a low of ${
          daily.data[0].temperatureLow
        } It is currently ${temperature} degrees out. There is a ${precipProbability} % chance of rain. `
      );
    }
  });
};

module.exports = forecast;
