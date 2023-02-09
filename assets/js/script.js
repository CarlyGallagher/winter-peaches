var key = 'd3a2ff100ca39275bb1aa547304afe71';
var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
var geoCode = 'https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
var search = document.getElementById('search-input');
var searchButton = document.getElementById('search-btn');
var cityEl = document.getElementById('city');

    searchButton.addEventListener('click', everythingNow)

    var newBtn = $('<button>')


    function everythingNow(event) {
        event.preventDefault();
        var geoCode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search.value + '&limit=1&appid=' + key + '';

        fetch(geoCode)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)


                var lat = data[0].lat;
                var lon = data[0].lon;
                var queryURL =
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;

                fetch(queryURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        cityEl.textContent = data.city.name;
                        for (var i = 0; i < 6; i++) {

                            document.getElementById("temp-" + i + "").textContent =
                                "temp: " + Number(data.list[i].main.temp).toFixed(0) + "°";
                        }

                        for (var i = 0; i < 6; i++) {
                            document.getElementById("wind-" + i + "").textContent =
                                "wind: " + Number(data.list[i].wind.speed).toFixed(0) + "mph";
                        }

                        for (var i = 0; i < 6; i++) {
                            document.getElementById("humidity-" + i + "").textContent =
                                "Humidity: " + Number(data.list[i].main.humidity).toFixed(0) + "%";
                        }
                        for (var i = 0; i < 6; i++) {
                            document.getElementById("icon-" + i + "").src =
                                "https://openweathermap.org/img/wn/" +
                                data.list[i].weather[0].icon + ".png";
                        }
                    });
                    
            });
    }
    // pulling the date for the results
    var weekday = [
        moment().format("dddd"),
        moment().add(1, "d").format("dddd"),
        moment().add(2, "d").format("dddd"),
        moment().add(3, "d").format("dddd"),
        moment().add(4, "d").format("dddd"),
        moment().add(5, "d").format("dddd"),
        moment().add(6, "d").format("dddd"),
    ];

    //sets the text to proper day
    for (let i = 0; i < 6; i++) {
        document.getElementById("date-" + i + "").textContent = weekday[i];
    }

    // sets item to local storage


    var cityHistory = [];

    $('.btn').click(function () {
        var searchBtn = $(this).parent().attr('id');
        console.log(searchBtn);
        localStorage.setItem('searchBtn', searchBtn);

        value = $(this).siblings('input').val();
        textString = $(this).siblings('div').text();
        localStorage.setItem(textString, JSON.stringify(value));

        //get local storage and put it in cityHistory

        cityHistory = localStorage.getItem('cityHistory');

        //if there is Nothing in city history than
        //cityHistory = [$(this).siblings("input").val()];
        if(!cityHistory) {
            cityHistory = [$(this).siblings("search-form").val()];
        }

        //else 
        // json parse cityhistory
        // and .push() $(this).siblings("input").val() into cityHistory

        else JSON.parse('cityHistory')
        cityHistory.push($(this).siblings("search-form").val());

        //This sets everything inside of this to empty so that we can add all the citys back from 
        // local storage. We could avoid this with another method but this is more simple.
        $("#selectable").html("");

        // This goes though the list of all citys in local and creates a button for them with the city name inside.
        for (var i =0; i < cityHistory; i++) {
            $("#selectable").append("<button>" + cityHistory[i] + "</button>");
        }

        //Json stringify cityHistory
        //then set item in local storyage

    });

$('#search-input').val(localStorage.getItem)