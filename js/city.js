var data;
var temp_weather_data;
var city;
var cityNumber;
var cityNumber_of_index_data;

async function cityInit(){
    data = await initData();
    getCity();
    renderPage();
}

function getCity(){
    let url = new URL(window.location.href);
    city = url.searchParams.get("city");
    cityNumber = getCityNumber(city);
    cityNumber_of_index_data = getCityNumber_of_index_data(city);
    console.log(city, cityNumber, cityNumber_of_index_data)
}

function renderPage(){
    let cityName = document.querySelector(".city-name");
    let cityWeather = document.querySelector(".city-weather");
    let cityWinddirInfo = document.querySelector(".city-WindDir-info");
    let cityAPInfo = document.querySelector(".city-AP-info");
    let cityRHInfo = document.querySelector(".city-RH-info");

    cityName.textContent = city;
    cityWeather.textContent = temp_weather_data[cityNumber_of_index_data]["weatherElement"][2]["time"][0]["parameter"]["parameterName"];
    cityWinddirInfo.textContent = data[cityNumber]["weatherElement"][1]["elementValue"];
    cityAPInfo.textContent = data[cityNumber]["weatherElement"][5]["elementValue"];
    cityRHInfo.textContent = data[cityNumber]["weatherElement"][4]["elementValue"];
}