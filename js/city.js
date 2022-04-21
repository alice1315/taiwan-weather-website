var data;
var city;
var cityNumber;
var cityNumberOfIndexData;

var cityTemp;
var cityIcon;
var date;
var weather;

async function cityInit(){
    await loadFunc()
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
    weather = sessionStorage.getItem("weather");
}

function renderPage(){
    document.querySelector('.main').style.display = 'block' //背景顯示
    document.getElementById('loadGif').style.display = 'none' // 載入消失

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
    cityWeatherIcon.title = weather;
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
}

function toIndex(){
    let btn = document.getElementById("city-button");
    btn.addEventListener("click", function(){
        location.href = "../html/index.html";
    })
}




async function loadFunc(){
    document.querySelector('.main').style.display = 'none' //背景消失
    let load_div = document.createElement('div')
    load_div.id='loadGif'
    load_div.style.display='flex'
    load_div.style.justifyContent='center'
    load_div.style.marginTop='40px'
    let loading = document.createElement('img')
    loading.src='../static/pics/loading.gif'
    loading.style.width='40px'
    loading.style.height='40px'
    loading.style.margin='0 auto'
    load_div.appendChild(loading)   
    document.body.appendChild(load_div)

    await new Promise(resolve => setTimeout(resolve, 500));
}