var city = '';

function fetchApi() {

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=83b3dbffead2223ddf32aa025f2e5f66'

    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);

            buildBoxInfo(data);

        });

}
fetchApi()



function buildBoxInfo(data) {

    // set the name of the city + country

    var nameCityHTML = document.querySelector('#city_name');
    var nameCityAPI = data.name;
    var nameCountryAPI = data.sys.country;
    console.log(nameCountryAPI);
    nameCityHTML.innerHTML = nameCityAPI + ' (' + nameCountryAPI + ')';

    // set the temperature
    var temperature = document.querySelector('#temp');
    var temp = data.main.temp;
    console.log(temp);
    var tempShort = temp - 273.15;
    var tempShortFixed = tempShort.toFixed(1);
    console.log(tempShortFixed);
    temperature.innerHTML = tempShortFixed + ' °C';

    // set the MAX temperature
    var temperatureMax = document.querySelector('#temp_max');
    var tempMax = data.main.temp_max;
    console.log(tempMax);
    var tempMaxShort = tempMax - 273.15;
    var tempMaxShortFixed = tempMaxShort.toFixed(1);
    console.log(tempMaxShortFixed);
    temperatureMax.innerHTML = 'Temp MAX: ' + tempMaxShortFixed + ' °C';

    // set the MIN temperature
    var temperatureMin = document.querySelector('#temp_min');
    var tempMin = data.main.temp_min;
    console.log(tempMin);
    var tempMinShort = tempMin - 273.15;
    var tempMinShortFixed = tempMinShort.toFixed(1);
    console.log(tempMinShortFixed);
    temperatureMin.innerHTML = 'Temp MIN: ' + tempMinShortFixed + ' °C';

    // set the current date
    var dateBox = document.querySelector('#date');
    console.log(dateBox);
    var actualDate = new Date();
    console.log(actualDate);
    dateBox.innerHTML = actualDate;

    // set the img icon
    var imgIcon = document.querySelector('#img_icon');



    var weatherCondition = data.weather[0].description;
    console.log(weatherCondition);

    var weatherMainCondition = data.weather[0].main;
    console.log(weatherMainCondition);

    var bodyVar = document.querySelector('#body');

    if (weatherMainCondition == 'Rain') {
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/10d.png)';

    } else if (weatherCondition == 'clear sky') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/01d.png)';

    } else if (weatherCondition == 'few clouds') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/02d.png)';

    } else if (weatherCondition == 'scattered clouds') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/03d.png)';

    } else if (weatherCondition == 'broken clouds') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/04d.png)';

    } else if (weatherCondition == 'shower rain') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/09d.png)';

    } else if (weatherCondition == 'thunderstorm') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/11d.png)';

    } else if (weatherCondition == 'snow') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/13d.png)';

    } else if (weatherCondition == 'mist') {
        
        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/50d.png)';

    }

}


function filterCity(data) {

    console.log('event')
    console.log(event);

    var inputCityHTML = document.querySelector('#input_city');
    var searchBtn = document.querySelector('#search-button');

    var valueFromInputHTML = inputCityHTML.value;
    console.log(valueFromInputHTML);

    city = valueFromInputHTML;

    fetchApi()
}
