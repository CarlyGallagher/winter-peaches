var APIkey = 'd3a2ff100ca39275bb1aa547304afe71'
var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=122.4194&appid=d3a2ff100ca39275bb1aa547304afe71'
var geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'
var search = document.getElementById('search-input');
var searchButton = document.getElementById('search-btn');
var city = document.getElementById('city');

searchButton.addEventListener('click', everythingNow);

function everythingNow() {
    var geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.value + '&limit=1&appid=' + APIkey + ''

    fetch(geoCode)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })

};
