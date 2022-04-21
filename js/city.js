var data;
var city;
var cityNumber;
var cityNumberOfIndexData;
var cityTemp;
var cityIcon;
var date;

async function cityInit(){
    data = await initCityData();
    getCity();
    getCityInfo();
    renderPage();
    toIndex();
}

function getCity(){
    let url = new URL(window.location.href);
    city = url.searchParams.get("city");
    cityNumber = getCityNumberOfCityData(city);
    cityNumberOfIndexData = getCityNumberOfIndexData(city);
}

async function getCityInfo(){
    date = sessionStorage.getItem("date");
    cityTemp = sessionStorage.getItem("cityTemp");
    cityIcon = sessionStorage.getItem("cityIcon");
}

function renderPage(){
    let dateDiv = document.querySelector('.index-date');
    let cityName = document.querySelector(".city-name > span");
    let cityWeather = document.querySelector(".city-weather");
    let cityWeatherIcon = document.querySelector(".city-weather-icon-img");
    let cityWdsdInfo = document.querySelector(".city-WindDir-info");
    let cityAPInfo = document.querySelector(".city-AP-info");
    let cityRHInfo = document.querySelector(".city-RH-info");
    let city_section = document.querySelector(".city-section");

    dateDiv.textContent = date;
    cityName.textContent = city;
    cityWeather.textContent = cityTemp;
    cityWeatherIcon.src = cityIcon;
    cityWdsdInfo.textContent = data[cityNumber]["weatherElement"][2]["elementValue"] + " m/s";
    
    if(data[cityNumber]["weatherElement"][5]["elementValue"] == -99){
        cityAPInfo.textContent = "測站異常"
        cityAPInfo.style.textDecoration = "none"
    }else{
        cityAPInfo.textContent = data[cityNumber]["weatherElement"][5]["elementValue"] + " hPa";
    }
    cityRHInfo.textContent = data[cityNumber]["weatherElement"][4]["elementValue"]*100 + " %";
    city_section.style.backgroundImage = "url('../static/pics/"+cityNumber+".jpg')"
    city_section.style.objectFit = "cover";
    // document.getElementById("loadGif").style.display="none";
}

function toIndex(){
    let btn = document.getElementById("city-button");
    btn.addEventListener("click", function(){
        location.href = "../html/index.html";
    })
}




