var data;
// 變數=============================================================
// 風向["records"]["location"][14]["weatherElement"][1]["elementValue"]
// 溫度["records"]["location"][172]["weatherElement"][3]["elementValue"]
// 濕度["records"]["location"][172]["weatherElement"][4]["elementValue"]
// 氣壓["records"]["location"][172]["weatherElement"][5]["elementValue"]
// 天氣狀況["records"]["location"][14]["weatherElement"][20]["elementValue"]

// 地區=============================================================
var weather_data_Keelung;
var weather_data_Taipei;
var weather_data_NewTaipeiCity;
var weather_data_Taoyuan;
var weather_data_Hsinchu;
var weather_data_Miaoli;
var weather_data_Taichung;
var weather_data_Changhua;
var weather_data_Nantou;
var weather_data_Yunlin;
var weather_data_Chiayi;
var weather_data_Tainan;
var weather_data_Kaoshiung;
var weather_data_Pingtung;
var weather_data_Taidong;
var weather_data_Huanlian;
var weather_data_Yilan;
var weather_data_Penghu;
var weather_data_Jinmen;
var weather_data_Matsu;

function init(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    fetch(src1).then(function(response){
        return response.json()
    }).then(function(weather_result){
        data = weather_result["records"]["location"]
        // weather_data_Keelung=weather_result["records"]["location"][95];
        // weather_data_Taipei=weather_result["records"]["location"][14];
        // weather_data_NewTaipeiCity=weather_result["records"]["location"][41];
        // weather_data_Taoyuan=weather_result["records"]["location"][18];
        // weather_data_Hsinchu=weather_result["records"]["location"][36];
        // weather_data_Miaoli=weather_result["records"]["location"][7];
        // weather_data_Taichung=weather_result["records"]["location"][32];
        // weather_data_Changhua=weather_result["records"]["location"][53];
        // weather_data_Nantou=weather_result["records"]["location"][39];
        // weather_data_Yunlin=weather_result["records"]["location"][93];
        // weather_data_Chiayi=weather_result["records"]["location"][87];
        // weather_data_Tainan=weather_result["records"]["location"][139];
        // weather_data_Kaoshiung=weather_result["records"]["location"][25];
        // weather_data_Pingtung=weather_result["records"]["location"][47];
        // weather_data_Taidong=weather_result["records"]["location"][76];
        // weather_data_Huanlian=weather_result["records"]["location"][63];
        // weather_data_Yilan=weather_result["records"]["location"][44];
        // weather_data_Penghu=weather_result["records"]["location"][40];
        // weather_data_Jinmen=weather_result["records"]["location"][120];
        // weather_data_Matsu=weather_result["records"]["location"][22];
    })
}

function getCityNumber(cityName){
    switch(cityName){
        case "基隆市":
            return 95;
        case "台北市":
            return 14;
        case "新北市":
            return 41;
        case "桃園市":
            return 18;
        case "新竹市":
            return 36;
        case "苗栗市":
            return 7;
        case "台中市":
            return 32;            
        case "彰化市":
            return 53;
        case "南投市":
            return 39;
        case "雲林市":
            return 93;            
        case "嘉義市":
            return 87;
        case "台南市":
            return 139;
        case "高雄市":
            return 25;
        case "屏東":
            return 47;
        case "台東市":
            return 76;     
        case "花蓮市":
            return 63;
        case "宜蘭市":
            return 44;  
        case "澎湖市":
            return 40;    
        case "金門市":
            return 120;
        case "馬祖市":
            return 22;                                                                                                                                                                                                                                                   
    }
}

// 給 index.js 的資料(天氣概況、溫度)
// 變數=============================================================
// 溫度["records"]["location"][地名]["weatherElement"][2]["time"][0]["parameter"]["parameterName"]
// 天氣狀況["records"]["location"][地名]["weatherElement"][0]["time"][0]["parameter"]["parameterName"]
var index_data_Keelung;
var index_data_Taipei;
var index_data_NewTaipeiCity;
var index_data_Taoyuan;
var index_data_Hsinchu;
var index_data_Miaoli;
var index_data_Taichung;
var index_data_Changhua;
var index_data_Nantou;
var index_data_Yunlin;
var index_data_Chiayi;
var index_data_Tainan;
var index_data_Kaoshiung;
var index_data_Pingtung;
var index_data_Taidong;
var index_data_Huanlian;
var index_data_Yilan;
var index_data_Penghu;
var index_data_Jinmen;
var index_data_Matsu;
// 溫度+["weatherElement"][2]["time"][0]["parameter"]["parameterName"]
// 天氣狀況+["weatherElement"][0]["time"][0]["parameter"]["parameterName"]

// 給 city.js 用的變數
var temp_weather_data;

function index_data(){
    let src2="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    fetch(src2).then(function(response){
        return response.json()
    }).then(function(temp_result){
        console.log(temp_result)
        // 給 index.js 用的變數
        index_data_Keelung=temp_result["records"]["location"][18];
        index_data_Taipei=temp_result["records"]["location"][5];
        index_data_NewTaipeiCity=temp_result["records"]["location"][1];
        index_data_Taoyuan=temp_result["records"]["location"][13];
        index_data_Hsinchu=temp_result["records"]["location"][3];
        index_data_Miaoli=temp_result["records"]["location"][8];
        index_data_Taichung=temp_result["records"]["location"][11];
        index_data_Changhua=temp_result["records"]["location"][20];
        index_data_Nantou=temp_result["records"]["location"][14];
        index_data_Yunlin=temp_result["records"]["location"][9];
        index_data_Chiayi=temp_result["records"]["location"][0];
        index_data_Tainan=temp_result["records"]["location"][6];
        index_data_Kaoshiung=temp_result["records"]["location"][15];
        index_data_Pingtung=temp_result["records"]["location"][17];
        index_data_Taidong=temp_result["records"]["location"][12];
        index_data_Huanlian=temp_result["records"]["location"][10];
        index_data_Yilan=temp_result["records"]["location"][7];
        index_data_Penghu=temp_result["records"]["location"][19];
        index_data_Jinmen=temp_result["records"]["location"][16];
        index_data_Matsu=temp_result["records"]["location"][21];
        // 給 city.js 用的變數
        temp_weather_data = temp_result["records"]["location"]
    })
}


function getCityNumber_of_index_data(cityName){
    switch(cityName){
        case "基隆市":
            return 18;
        case "台北市":
            return 5;
        case "新北市":
            return 1;
        case "桃園市":
            return 13;
        case "新竹市":
            return 3;
        case "苗栗市":
            return 8;
        case "台中市":
            return 11;            
        case "彰化市":
            return 20;
        case "南投市":
            return 14;
        case "雲林市":
            return 9;            
        case "嘉義市":
            return 0;
        case "台南市":
            return 6;
        case "高雄市":
            return 15;
        case "屏東":
            return 17;
        case "台東市":
            return 12;     
        case "花蓮市":
            return 10;
        case "宜蘭市":
            return 7;  
        case "澎湖市":
            return 19;    
        case "金門市":
            return 16;
        case "馬祖市":
            return 21;                                                                                                                                                                                                                                                   
    }
}