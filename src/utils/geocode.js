const request = require('request');

const geocode = (address, callback) => {
  //prettier-ignore
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieXZvbm5rcjg2IiwiYSI6ImNqeXZmNWZlZzBoYngzYm1wYjF6YTkzamoifQ.kPqlH4T2bCtA13AGmIRSAw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location.Try another search.', undefined);
    } else {
      const { features } = body;
      const { center, place_name } = features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      });
    }
  });
};

module.exports = geocode;

//=====================================================================================================================
// //Geocoding
// //user provides an address => use api to convert it to lat/long => then pass the coodinates to darksky api => to get the weather data.
// //(Los%20Angeles)

// const geocodeUrl =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Birmingham.json?access_token=pk.eyJ1IjoieXZvbm5rcjg2IiwiYSI6ImNqeXZmNWZlZzBoYngzYm1wYjF6YTkzamoifQ.kPqlH4T2bCtA13AGmIRSAw&limit=1';

// request({ url: geocodeUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to location services!');
//   } else if (response.body.features.length === 0)
//     console.log('Unable to find location');
//   else {
//     const { features, query } = response.body;
//     const longitude = features[0].center[0];
//     const latitude = features[0].center[1];
//     //   const city = query;

//     console.log(longitude, latitude);
//   }
// });
