document.querySelector('#tempMain').style.display = "none";
document.querySelector('#forecast').style.display = "none";

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
            console.log('fetch')
        
        });

}
fetchApi()



function buildBoxInfo(data) {

    var bodyVar = document.querySelector('#body');
    bodyVar.style.backgroundColor = "lightblue";

    // set the name of the city + country
    console.log('buildBoxInfo')

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

    
    // ---

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

    } else if (weatherMainCondition == 'Drizzle') {

        bodyVar.style.backgroundImage = 'url(http://openweathermap.org/img/w/09d.png)';
    }
}


function filterCity(data) {

    //   var bodyVar = document.querySelector('#body');
    //    bodyVar.style.backgroundColor = "white"; 
    //    document.querySelector('#body').style.backgroundColor = "white";
    document.querySelector('#tempMain').style.display = "block";

    console.log('filterCity')

    console.log('event')
    console.log(event);

    var inputCityHTML = document.querySelector('#input_city');
    var searchBtn = document.querySelector('#search-button');

    var valueFromInputHTML = inputCityHTML.value;
    console.log(valueFromInputHTML);

    city = valueFromInputHTML;

    fetchApi()
    
}

function fetchForecast() {

    const url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=83b3dbffead2223ddf32aa025f2e5f66'

    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            console.log(data.city.name);         
        buildForecastSection(data)
        });

}
//fetchForecast()





function buildForecastSection(data) {
//console.log(document.querySelector('#forecast'))
document.querySelector('#forecast').style.display = "flex";
    
    var mainDivForecast = document.querySelector('#forecast');


    var listForecast = data.list;
    console.log(listForecast)
    //    var allForecast = listForecast[0].dt_txt;
    //    console.log(allForecast)

    for (i = 0; i < listForecast.length; i++) {

        var microDiv = document.createElement('div');
        microDiv.setAttribute('class', 'micro_div');



        mainDivForecast.appendChild(microDiv);

//                 console.log(mainDivForecast);

            var allForecast = listForecast[i].dt_txt;
//            console.log(allForecast);

            microDiv.innerHTML = allForecast;

            var btnMicroDiv = document.createElement('button');
            btnMicroDiv.setAttribute('class', 'btn_micro_div');
            microDiv.appendChild(btnMicroDiv);
            btnMicroDiv.innerHTML = 'PRESS';



    }
    console.log(mainDivForecast);
    
}
