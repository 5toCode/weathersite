const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.post('/', function(req, res) {
    const zip = req.body.zip;
    const apiKey = 'a797c2972f9898eddc70687f44b96366';
    const unit = 'imperial'
    const url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&appid=' + apiKey + '&units=' + unit;
    https.get(url, function(response) {
    response.on('data', function(data) {
        const weatherData = JSON.parse(data);
        const cityName = weatherData.name;
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        res.write('<h1>The temperature in ' + zip + ' (' + cityName + ') is ' + temp + ' degrees Fahrenheit.</h1>');
        res.write('<h2>The weather is currently ' + description + '.</h2>');
        res.write('<img src=' + imageURL + '>');
        res.send();
      });
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000.');
});