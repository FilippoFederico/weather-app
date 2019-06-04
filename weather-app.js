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
    //    console.log(data.id)

    var nameCityHTML = document.querySelector('#city_name');
    var nameCityAPI = data.name;
    var nameCountryAPI = data.sys.country;
    //    console.log(nameCountryAPI);
    nameCityHTML.innerHTML = nameCityAPI + ' (' + nameCountryAPI + ')';

    // set the temperature
    var temperature = document.querySelector('#temp');
    var temp = data.main.temp;
    //    console.log(temp);
    var tempShort = temp - 273.15;
    var tempShortFixed = tempShort.toFixed(1);
    //    console.log(tempShortFixed);
    temperature.innerHTML = tempShortFixed + ' °C';

    // set the MAX temperature
    var temperatureMax = document.querySelector('#temp_max');
    var tempMax = data.main.temp_max;
    //    console.log(tempMax);
    var tempMaxShort = tempMax - 273.15;
    var tempMaxShortFixed = tempMaxShort.toFixed(1);
    //    console.log(tempMaxShortFixed);
    temperatureMax.innerHTML = 'Temp MAX: ' + tempMaxShortFixed + ' °C';

    // set the MIN temperature
    var temperatureMin = document.querySelector('#temp_min');
    var tempMin = data.main.temp_min;
    //    console.log(tempMin);
    var tempMinShort = tempMin - 273.15;
    var tempMinShortFixed = tempMinShort.toFixed(1);
    //    console.log(tempMinShortFixed);
    temperatureMin.innerHTML = 'Temp MIN: ' + tempMinShortFixed + ' °C';

    // set the current date
    var dateBox = document.querySelector('#date');
    console.log(dateBox);
    var actualDate = new Date().toLocaleDateString();
    var actualTime = new Date().toLocaleTimeString();
    dateBox.innerHTML = actualDate + ' ' + actualTime;

    // set the img icon
    var imgIcon = document.querySelector('#img_icon');

    var weatherCondition = data.weather[0].description;
    //    console.log(weatherCondition);

    var weatherMainCondition = data.weather[0].main;
    //    console.log(weatherMainCondition);


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

    //push data.id to btn "show more"

    var idCityChosen = data.id;
    //    console.log(idCityChosen);

    var btnShowMore = document.querySelector('.btn_details');

    btnShowMore.addEventListener('click', function (event) {

        btnShowMore.setAttribute('id', idCityChosen);
        console.log(btnShowMore);

        var idFromEvent = event.target.id;

        idCity = idCityChosen;
        console.log(idCity);

        fetchForecast(event);

    })
}


function filterCity(data) {

    //   var bodyVar = document.querySelector('#body');
    //    bodyVar.style.backgroundColor = "white"; 
    //    document.querySelector('#body').style.backgroundColor = "white";
    document.querySelector('#tempMain').style.display = "block";
    document.querySelector('#forecast').style.display = "none";

    console.log('filterCity')

    //    console.log('event')
    console.log(event);

    var inputCityHTML = document.querySelector('#input_city');
    var searchBtn = document.querySelector('#search-button');

    var valueFromInputHTML = inputCityHTML.value;
    console.log(valueFromInputHTML);

    city = valueFromInputHTML;

    fetchApi()

}

var idCity = '';

function fetchForecast(event) {

    const url = 'http://api.openweathermap.org/data/2.5/forecast?id=' + idCity + '&APPID=83b3dbffead2223ddf32aa025f2e5f66'
    //  524901
    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            console.log(data.city.name);

            buildForecastSection(data);

        });

}

function buildForecastSection(data) {
    //console.log(document.querySelector('#forecast'))


    document.querySelector('#forecast').innerHTML = ""
    document.querySelector('#forecast').style.display = "flex";

    var mainDivForecast = document.querySelector('#forecast');


    let listForecast = data.list;
    console.log(listForecast);

    for (var i = 0; i < listForecast.length; i++) {

        var microDiv = document.createElement('div');
        microDiv.setAttribute('class', 'micro_div');
        //        microDiv.setAttribute('onmouseover', 'mouseOn()');
        //        microDiv.setAttribute('onmouseout', 'mouseOut()');


        var pName = document.createElement('p');
        var pDate = document.createElement('p');

        pName.setAttribute('class', 'p_name');
        pDate.setAttribute('class', 'p_date');

        microDiv.appendChild(pName);
        microDiv.appendChild(pDate);

        mainDivForecast.appendChild(microDiv);

        var allForecast = listForecast[i].dt_txt;
        //        console.log(allForecast);
        var nameCityForecast = data.city.name;
        //        console.log(nameCityForecast);
        var dtForecast = listForecast[i].dt;

        pDate.innerHTML = allForecast;
        pName.innerHTML = nameCityForecast;
        
        var divIconTemp = document.createElement('div');
        divIconTemp.setAttribute('class', 'div_icontemp');
        divIconTemp.setAttribute('id', "div" + dtForecast) 

        microDiv.appendChild(divIconTemp);

        console.log(divIconTemp)

        var btnMicroDiv = document.createElement('button');
        btnMicroDiv.setAttribute('class', 'btn_micro_div');

        btnMicroDiv.setAttribute('id', listForecast[i].dt);
        
        //        microDiv.appendChild(h4Forecast);
        microDiv.appendChild(btnMicroDiv);

        btnMicroDiv.innerHTML = 'PRESS';

        btnMicroDiv.addEventListener('click', function (event) {
            clickForecastInfo(data, divIconTemp)
            console.log(event)
        })
    }
    console.log(mainDivForecast);
}

function clickForecastInfo(data, divIconTemp) {
    console.log('ciaooooooooo')

    console.log(data)

    var btnMicrodiv = document.querySelector('.btn_micro_div');

    var eventTargetId = document.getElementById("div" + event.target.id);

btnMicrodiv.innerHTML = 'X'

    //    console.log(microDivForecast)
    console.log(btnMicrodiv)
    //        console.log(divIconTemp);
    console.log(eventTargetId); //

    console.log(data)
    let listForecast = data.list;
    console.log(listForecast);



    for (var i = 0; i < listForecast.length; i++) {

        //        console.log(event.target.id)
        //        console.log(listForecast[i].dt)
        if (event.target.id == listForecast[i].dt) {
            console.log("inside if")
            var imgForecast = document.createElement('img');
            imgForecast.setAttribute('src', '');
            imgForecast.setAttribute('class', 'icon_forecast');
            eventTargetId.appendChild(imgForecast);


            console.log(listForecast[i])
            var weatherMainForecast = listForecast[i].weather[0].main;
            console.log(weatherMainForecast);

            var weatherDescriptionForecast = listForecast[i].weather[0].description;
            //        console.log(weatherDescriptionForecast);

            //        console.log(microDiv)
            // ---

            if (weatherMainForecast == 'Rain') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/10d.png');


            } else if (weatherDescriptionForecast == 'clear sky') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/01d.png');

            } else if (weatherDescriptionForecast == 'few clouds') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/02d.png');

            } else if (weatherDescriptionForecast == 'scattered clouds') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/03d.png');

            } else if (weatherDescriptionForecast == 'overcast clouds') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/04d.png');

            } else if (weatherDescriptionForecast == 'broken clouds') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/04d.png');

            } else if (weatherDescriptionForecast == 'shower rain') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/09d.png');

            } else if (weatherDescriptionForecast == 'thunderstorm') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/11d.png');

            } else if (weatherMainForecast == 'Snow') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/13d.png');

            } else if (weatherDescriptionForecast == 'mist') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/50d.png');;

            } else if (weatherMainForecast == 'Drizzle') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/09d.png');
            } else if (weatherMainForecast == 'Clouds') {

                imgForecast.setAttribute('src', 'http://openweathermap.org/img/w/09d.png');
            }

            // set the temperature
            var h4Forecast = document.createElement('h3');
            h4Forecast.setAttribute('class', 'h4_forecast');

            var temperatureForecast = listForecast[i].main.temp;
            //        console.log(temperatureForecast);
            var tempShortForecast = (temperatureForecast - 273.15).toFixed(1);
            //        console.log(tempShortForecast);
            h4Forecast.innerHTML = tempShortForecast + ' °C';


            eventTargetId.appendChild(h4Forecast);

        }

    }
}
