async function initCityData(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    await fetch(src1).then(function(response){
        return response.json()
    }).then(function(weather_result){
        data = weather_result["records"]["location"]
    })
    return data;
}

function getCityNumberOfCityData(cityName){
    switch(cityName){
        case "基隆市":
            return 95;
        case "臺北市":
            return 14;
        case "新北市":
            return 41;
        case "桃園市":
            return 18;
        case "新竹縣":
            return 36;
        case "苗栗縣":
            return 7;
        case "臺中市":
            return 32;            
        case "彰化縣":
            return 53;
        case "南投縣":
            return 39;
        case "雲林縣":
            return 93;            
        case "嘉義縣":
            return 87;
        case "臺南市":
            return 139;
        case "高雄市":
            return 25;
        case "屏東縣":
            return 47;
        case "臺東縣":
            return 76;     
        case "花蓮縣":
            return 63;
        case "宜蘭縣":
            return 44;  
        case "澎湖縣":
            return 40;    
        case "金門縣":
            return 120;
        case "連江縣":
            return 22;
        case "新竹市":
            return 36;
        case "嘉義市":
            return 87;
                                                                                                                                                                                                                                                              
    }
}

async function initIndexData(){
    let src2="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    await fetch(src2).then(function(response){
        return response.json()
    }).then(function(temp_result){
        temp_weather_data = temp_result["records"]["location"]
    })
    return temp_weather_data;
}

function getCityNumberOfIndexData(cityName){
    switch(cityName){
        case "基隆市":
            return 18;
        case "臺北市":
            return 5;
        case "新北市":
            return 1;
        case "桃園市":
            return 13;
        case "新竹縣":
            return 3;
        case "新竹市":
            return 4;
        case "苗栗縣":
            return 8;
        case "臺中市":
            return 11;            
        case "彰化縣":
            return 20;
        case "南投縣":
            return 14;
        case "雲林縣":
            return 9;            
        case "嘉義縣":
            return 0;
        case "嘉義市":
            return 2;
        case "臺南市":
            return 6;
        case "高雄市":
            return 15;
        case "屏東縣":
            return 17;
        case "臺東縣":
            return 12;     
        case "花蓮縣":
            return 10;
        case "宜蘭縣":
            return 7;  
        case "澎湖縣":
            return 19;    
        case "金門縣":
            return 16;
        case "連江縣":
            return 21;                                                                                                                                                                                                                                                   
    }
}

async function getIcons(){
    let src3 = "https://alemapnil.github.io/wehelp-assignments/data/weatherIcon.json"
    await fetch(src3).then(function(response){
        return response.json()
    }).then(function(result){
        icon = result
    })
    return icon;
}
