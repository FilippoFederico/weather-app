// api key = 83b3dbffead2223ddf32aa025f2e5f66

var city = 'Berlin'

function fetchApi() {

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=83b3dbffead2223ddf32aa025f2e5f66'

    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            

        buildBoxInfo(data)
        
        });

}
fetchApi()



function buildBoxInfo(data) {
    
    // set the name of the city
    var nameCityHTML = document.querySelector('#city_name');
    var nameCityAPI = data.name;
    nameCityHTML.innerHTML = nameCityAPI;
    
    // set the temperature
    var temperature = document.querySelector('#temp');
    var temp = data.main.temp;
    console.log(temp);
    var tempShort = temp - 273.15;
    var tempShortFixed = tempShort.toFixed(1);
    console.log(tempShortFixed);
    
    
    
    // set the date
    var dateBox = document.querySelector('#date');
    console.log(dateBox);
    var actualDate = new Date();
    console.log(actualDate);
    dateBox.innerHTML = actualDate;
}

