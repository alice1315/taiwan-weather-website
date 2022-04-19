function init(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    fetch(src1).then(function(response){
        return response.json()
    }).then(function(weather_result){
        console.log(weather_result)
    })
}

