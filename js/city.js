var data;
var city;
var cityNumber;
var cityNumberOfIndexData;

var cityTemp;
var cityIcon;
var date;
var weather;




async function cityInit(){
    await loadFunc2()
    data = await initCityData();
    getWeatherValue()

    getCity();
    getCityInfo();
    renderPage();
    toIndex();
}

function getWeatherValue(){
    for (let a = 0; a < Object.keys(arr2).length; a++){//歷遍每個縣市，蒐集其資料，arr2[a]是 {county:"基隆市",id:0}
        for (let d=0; d<Object.keys(data).length;d++){ //抓出氣象局縣市的鄉鎮row index
            if (arr2[a]['county'] == data[d]['parameter'][0]['parameterValue']){
                arr2[a]['townNo'].push(d)
            }
        }
    }

    for (let a = 0; a < Object.keys(arr2).length; a++){//歷遍每個縣市，蒐集其資料，存取各鄉鎮風速、雨量、濕度的值
        for (let n=0; n<Object.keys(arr2[a].townNo).length;n++){ //存取各鄉鎮風速、雨量、濕度的值

            let townIndex = arr2[a].townNo[n]
            let wdsd = Number(data[townIndex]["weatherElement"][2]["elementValue"]) //風速
            let humd = Number(data[townIndex]["weatherElement"][4]["elementValue"]) // 濕度
            let daylightTime = Number(data[townIndex]["weatherElement"][18]["elementValue"])// 日照時數
            if (wdsd >= 0){arr2[a].wind.push(wdsd)}
            if (humd >=0){arr2[a].humid.push(humd)}
            if (daylightTime>=0){arr2[a].light.push(daylightTime)}
        }

        let sum = arr2[a].wind.reduce((a, b) => a + b, 0), len = arr2[a].wind.length
        if (len > 0){
            if (Number.isInteger(sum/len)){
                arr2[a].averageWind = (sum/len)+ " m/s"
            }
            else{
               arr2[a].averageWind = (sum/len).toFixed(2)+ " m/s" 
            }
        }
        else{
            arr2[a].averageWind = "測站異常"
        }

        sum = arr2[a].humid.reduce((a, b) => a + b, 0), len = arr2[a].humid.length
        if (len > 0){
            if (Number.isInteger(sum/len)){
                arr2[a].averageHumid = (sum/len)*100+ " %"
            }
            else{
                arr2[a].averageHumid = ((sum/len).toFixed(2))*100+ " %"
            }
        }
        else{
            arr2[a].averageHumid = "測站異常"
        }

        sum = arr2[a].light.reduce((a, b) => a + b, 0), len = arr2[a].light.length
        if (len > 0){
            if (Number.isInteger(sum/len)){
                arr2[a].averageLight = (sum/len)+ " hr/天"
            }
            else{
                arr2[a].averageLight = (sum/len).toFixed(2)+ " hr/天"
            }
        }
        else{
            arr2[a].averageLight = "測站異常"
        }
    }

}


function getCity(){
    let url = new URL(window.location.href);
    city = url.searchParams.get("city");

    for (let c=0; c<arr2.length; c++){
        if (city === arr2[c].county){
            cityNumber = c
        }
    }
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
    cityWdsdInfo.textContent = arr2[cityNumber].averageWind
    cityAPInfo.textContent = arr2[cityNumber].averageLight
    cityRHInfo.textContent = arr2[cityNumber].averageHumid
    city_section.style.backgroundImage = "url('../static/pics/"+cityNumber+".jpg')"
    city_section.style.objectFit = "cover";
}

function toIndex(){
    let btn = document.getElementById("city-button");
    btn.addEventListener("click", function(){
        location.href = "../html/index.html";
    })
}


async function loadFunc2(){
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



let arr2 =[{county:"基隆市",id:0,townNo:[],wind:[],light:[],humid:[]},
{county:"臺北市",id:1,townNo:[],wind:[],light:[],humid:[]},
{county:"新北市",id:2,townNo:[],wind:[],light:[],humid:[]},
{county:"桃園市",id:3,townNo:[],wind:[],light:[],humid:[]},
{county:"新竹市",id:4,townNo:[],wind:[],light:[],humid:[]},
{county:"新竹縣",id:5,townNo:[],wind:[],light:[],humid:[]},
{county:"苗栗縣",id:6,townNo:[],wind:[],light:[],humid:[]},
{county:"臺中市",id:7,townNo:[],wind:[],light:[],humid:[]},
{county:"彰化縣",id:8,townNo:[],wind:[],light:[],humid:[]},
{county:"南投縣",id:9,townNo:[],wind:[],light:[],humid:[]},
{county:"雲林縣",id:10,townNo:[],wind:[],light:[],humid:[]},
{county:"嘉義市",id:11,townNo:[],wind:[],light:[],humid:[]},
{county:"嘉義縣",id:12,townNo:[],wind:[],light:[],humid:[]},
{county:"臺南市",id:13,townNo:[],wind:[],light:[],humid:[]},
{county:"高雄市",id:14,townNo:[],wind:[],light:[],humid:[]},
{county:"屏東縣",id:15,townNo:[],wind:[],light:[],humid:[]},
{county:"宜蘭縣",id:16,townNo:[],wind:[],light:[],humid:[]},
{county:"花蓮縣",id:17,townNo:[],wind:[],light:[],humid:[]},
{county:"臺東縣",id:18,townNo:[],wind:[],light:[],humid:[]},
{county:"澎湖縣",id:19,townNo:[],wind:[],light:[],humid:[]},
{county:"金門縣",id:20,townNo:[],wind:[],light:[],humid:[]},
{county:"連江縣",id:21,townNo:[],wind:[],light:[],humid:[]}]
