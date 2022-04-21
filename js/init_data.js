var data;

async function init(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    await fetch(src1).then(function(response){
        return response.json()
    }).then(function(weather_result){
        data = weather_result["records"]["location"]
    })
    return data;
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
// 給 city.js 用的變數
var temp_weather_data;

async function index_data(){
    let src2="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    await fetch(src2).then(function(response){
        return response.json()
    }).then(function(temp_result){
        console.log(temp_result)
        // 給 city.js 用的變數
        temp_weather_data = temp_result["records"]["location"]
    })
    return temp_weather_data;
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