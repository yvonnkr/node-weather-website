const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const name = 'Yvonne Nkr';
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//render using handlebars

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    helpText: 'This is some helpfull text..'
  });
});

//not hbs
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    });
  }

  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  const item = req.query.search;
  res.send({
    products: [item]
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name,
    errorMessage: 'Help article not found!'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name,
    errorMessage: 'Page not found!'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
