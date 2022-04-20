// 變數=============================================================
// 風向["records"]["location"][14]["weatherElement"][1]["elementValue"]
// 溫度["records"]["location"][172]["weatherElement"][3]["elementValue"]
// 濕度["records"]["location"][172]["weatherElement"][4]["elementValue"]
// 氣壓["records"]["location"][172]["weatherElement"][5]["elementValue"]
// 天氣狀況["records"]["location"][14]["weatherElement"][20]["elementValue"]

// 地區=============================================================
let weather_data_Keelung;
let weather_data_Taipei;
let weather_data_NewTaipeiCity;
let weather_data_Taoyuan;
let weather_data_Hsinchu;
let weather_data_Miaoli;
let weather_data_Taichung;
let weather_data_changhua;
let weather_data_Nantou;
let weather_data_Yunlin;
let weather_data_Chiayu;
let weather_data_Tainan;
let weather_data_Kaoshiung;
let weather_data_Pingtung;
let weather_data_Taidong;
let weather_data_Huanlian;
let weather_data_Yilan;
let weather_data_Penghu;
let weather_data_Jinmen;
let weather_data_Matsu;

function init(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    fetch(src1).then(function(response){
        return response.json()
    }).then(function(weather_result){
        console.log(weather_result)
        // console.log(weather_result["records"]["location"][172]["weatherElement"][4])
        // console.log(weather_result["records"]["location"][172]["weatherElement"][4][1])
        // console.log(weather_result["records"]["location"][172]["weatherElement"][4]["elementValue"])
        weather_data_Keelung=weather_result["records"]["location"][95];
        weather_data_Taipei=weather_result["records"]["location"][14];
        weather_data_NewTaipeiCity=weather_result["records"]["location"][41];
        weather_data_Taoyuan=weather_result["records"]["location"][18];
        weather_data_Hsinchu=weather_result["records"]["location"][36];
        weather_data_Miaoli=weather_result["records"]["location"][7];
        weather_data_Taichung=weather_result["records"]["location"][32];
        weather_data_changhua=weather_result["records"]["location"][53];
        weather_data_Nantou=weather_result["records"]["location"][39];
        weather_data_Yunlin=weather_result["records"]["location"][93];
        weather_data_Chiayu=weather_result["records"]["location"][87];
        weather_data_Tainan=weather_result["records"]["location"][139];
        weather_data_Kaoshiung=weather_result["records"]["location"][25];
        weather_data_Pingtung=weather_result["records"]["location"][47];
        weather_data_Taidong=weather_result["records"]["location"][76];
        weather_data_Huanlian=weather_result["records"]["location"][63];
        weather_data_Yilan=weather_result["records"]["location"][44];
        weather_data_Penghu=weather_result["records"]["location"][40];
        weather_data_Jinmen=weather_result["records"]["location"][120];
        weather_data_Matsu=weather_result["records"]["location"][22];
    })
}