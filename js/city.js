var data;
var tempWeatherData;
var city;
var cityNumber;
var cityNumberOfIndexData;

async function cityInit(){
    data = await initCityData();
    tempWeatherData = await initIndexData();
    getCity();
    renderPage();
    toIndex();
}

function getCity(){
    let url = new URL(window.location.href);
    city = url.searchParams.get("city");
    cityNumber = getCityNumberOfCityData(city);
    cityNumberOfIndexData = getCityNumberOfIndexData(city);
}

function renderPage(){
    let cityName = document.querySelector(".city-name > span");
    let cityWeather = document.querySelector(".city-weather");
    let cityWeatherIcon = document.querySelector(".city-weather-icon-img");
    let cityWdsdInfo = document.querySelector(".city-WindDir-info");
    let cityAPInfo = document.querySelector(".city-AP-info");
    let cityRHInfo = document.querySelector(".city-RH-info");
    // 塞入圖片需要的變數
    let city_section = document.querySelector(".city-section");

    cityName.textContent = city;
    cityWeather.textContent = tempWeatherData[cityNumberOfIndexData]["weatherElement"][2]["time"][0]["parameter"]["parameterName"] + " °C";
    // cityWeatherIcon.src = icon;
    cityWdsdInfo.textContent = data[cityNumber]["weatherElement"][2]["elementValue"] + " m/s";
    cityAPInfo.textContent = data[cityNumber]["weatherElement"][5]["elementValue"] + " hPa";
    cityRHInfo.textContent = data[cityNumber]["weatherElement"][4]["elementValue"] + " %";
    // 塞入圖片
    city_section.style.backgroundImage = "url('../static/pics/"+cityNumber+".jpg')"
    city_section.style.objectFit = "cover";
}

function toIndex(){
    let btn = document.getElementById("city-button");
    btn.addEventListener("click", function(){
        location.href = "../html/index.html";
    })
}

