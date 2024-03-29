var cityInput = document.querySelector("#search");
var cityFormEl = document.querySelector("#city-form")
var weatherDisplay = document.querySelector("#weather-display");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var forecastE1 = document.querySelector("#dayOne")
var forecastE2 = document.querySelector("#dayTwo");
var forecastE3 = document.querySelector("#dayThree");
var forecastE4 = document.querySelector("#dayFour");
var forecastE5 = document.querySelector("#dayFive");
var cityDisplay = document.querySelector("#savedCity")
var cities = [];


var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (cityInput) {
        getWeatherCity(city);
        weatherDisplay.textContent = "";
        cityInput.value = "";
        forecastE1.textContent="";
        forecastE2.textContent='';
        forecastE3.textContent='';
        forecastE4.textContent='';
        forecastE5.textContent='';
        cities.push(city);
        localStorage.setItem("searchcity", JSON.stringify(cities));
    }
    else {
        alert("Please enter a City")
    }
}

const displayCities = () => {
    let cityDataOne = JSON.parse(localStorage.getItem("searchcity"))
    
    function removeDuplicates(cityDataOne) {
        return cityDataOne.filter((item,
            index) => cityDataOne.indexOf(item) === index);
    }

    let cityDataTwo = (removeDuplicates(cityDataOne))

    let cityDataThree = cityDataTwo.filter(function (item) {
        return item}
    );

    console.log(cityDataThree)

    let cityList = document.getElementById("savedCity")

    cityDataThree.forEach((item) => {
        let li = document.createElement("li");
        let cityButton = document.createElement("button")
        cityButton.setAttribute('id', 'cityButton')
        cityButton.innerText = item
        const buttonWeather = (event) => {
            event.preventDefault();

            getWeatherCity(item);
            weatherDisplay.textContent = "";
            cityInput.value = "";
            forecastE1.textContent="";
            forecastE2.textContent='';
            forecastE3.textContent='';
            forecastE4.textContent='';
            forecastE5.textContent='';

            console.log(item)
        }

        cityButton.addEventListener('click', buttonWeather)        
        li.appendChild(cityButton)
        cityList.appendChild(li)
    })

    const cityBtn = document.getElementById('cityButton')

    cityBtn.addEventListener('click', console.log(cityBtn.innerText))
}

displayCities();


var getWeatherCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5892e2480d6960f5cd946e34ca7a09e1";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {
                    //console.log(data);
                    displayWeather(data, city);
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather data")
        });
    //console.log(city);
        
    //cities.push(city);
    
    

    // cities = cities.concat(JSON.parse(localStorage.getItem("searchcity")))
    //localStorage.setItem("searchcity", JSON.stringify(cities));

    //console.log(cities);

    function getCity() {
        return localStorage.getItem('searchcity');
    }

    console.log(getCity());

};


var displayWeather = function (data, searchTerm) {

    var currentIconImg = document.createElement("img");
    currentIconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    weatherDisplay.appendChild(currentIconImg);


    var date= moment.unix(data.dt).format("MM/DD/YYYY");

    weatherSearchTerm.textContent = "Weather in " + searchTerm + " " + date;
    console.log(data.weather[0].icon);
    var getWeather = function (lat, long) {
        var lat = (data.coord.lat);
        var long = (data.coord.lon);

        var apUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=5892e2480d6960f5cd946e34ca7a09e1";

        fetch(apUrl).then(function (response) {
            if (response.ok)
                response.json().then(function (data) {
                    displayData(data);
                    displayForecast1(data);
                    displayForecast2(data);
                    displayForecast3(data);
                    displayForecast4(data);
                    displayForecast5(data);
                });
        })
        console.log(apUrl);

    }

    var displayData = function (data) {
        let stuff = ["Temperature: " + data.current.temp + "F", "Wind Speed: " + data.current.wind_speed + "mph", "Humidity: " + data.current.humidity + "%"];
        let list = document.getElementById("weather-display")

        const UVI = () => {
            let uviName = document.createElement("li");
            let uviData = document.createElement("span");
            uviData.setAttribute('id', "UVI");
            uviData.innerText = [data.current.uvi]
            uviName.innerText = ['UVI: ']
            uviName.appendChild(uviData)
            list.appendChild(uviName)
            const UVI = document.getElementById("UVI")
            if (uviData.innerText <= 4.99) {
                UVI.style.setProperty('--uvi-color', 'green');
            } if (uviData.innerText >= 5) {
                UVI.style.setProperty('--uvi-color', 'yellow');
            } if (uviData.innerText >= 7) {
                UVI.style.setProperty('--uvi-color', 'red');
            }

        }

        stuff.forEach((item) => {
            let li = document.createElement("li");
            li.innerText = item;
            list.appendChild(li);
        })         

        UVI();
        

    }

    var displayForecast1 = function (data) {
        var date= moment.unix(data.daily[1].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[1].temp.day + "F", "Wind Speed: " + data.daily[1].wind_speed + "mph", "Humidty: " + data.daily[1].humidity + "%"]
        let list = document.getElementById("dayOne")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 

        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
        forecastE1.appendChild(iconImg);
    }
    var displayForecast2 = function (data) {
        

        var date= moment.unix(data.daily[2].dt).format("MM/DD/YYYY");
        
        

        let forecast = [date, "Temp: " + data.daily[2].temp.day + "F", "Wind Speed: " + data.daily[2].wind_speed + "mph", "Humidty: " + data.daily[2].humidity + "%"]
        let list = document.getElementById("dayTwo")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
        
        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
        forecastE2.appendChild(iconImg);
    }
    var displayForecast3 = function (data) {
        var date= moment.unix(data.daily[3].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[3].temp.day + "F", "Wind Speed: " + data.daily[3].wind_speed + "mph", "Humidty: " + data.daily[3].humidity + "%"]
        let list = document.getElementById("dayThree")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 

        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
        forecastE3.appendChild(iconImg);

    }
    var displayForecast4 = function (data) {
        var date= moment.unix(data.daily[4].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[4].temp.day + "F", "Wind Speed: " + data.daily[4].wind_speed + "mph", "Humidty: " + data.daily[4].humidity + "%"]
        let list = document.getElementById("dayFour")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 

        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
        forecastE4.appendChild(iconImg);

    }
    var displayForecast5 = function (data) {
        var date= moment.unix(data.daily[5].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[5].temp.day + "F", "Wind Speed: " + data.daily[5].wind_speed + "mph", "Humidty: " + data.daily[5].humidity + "%"]
        let list = document.getElementById("dayFive")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 

        var iconImg = document.createElement("img");
        iconImg.setAttribute('src', "https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
        forecastE5.appendChild(iconImg);
    }
    getWeather();
}

cityFormEl.addEventListener("submit", formSubmitHandler);