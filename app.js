const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(req, res) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?zip=32461&appid=a797c2972f9898eddc70687f44b96366&units=imperial'
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write('<h1>The temperature in Rosemary Beach is ' + temp + ' degrees Fahrenheit.</h1>');
            res.write('<h2>The weather is currently ' + description + '.</h2>');
            res.write('<img src=' + imageURL + '>');
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000.');
});