async function index(){
    let src1="https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-107EDD1F-7B3D-45E1-B83C-4FB6EFAC75A4&format=JSON"
    
    let data_36hr = await getFetch(src1)
    let old_records_36hr = data_36hr['records']['location']

    let whIcon = await getFetch('https://alemapnil.github.io/wehelp-assignments/data/weatherIcon.json')


    //使縣市有南北順序排列
    let records_36hr=[]
    for (let j=0; j<old_records_36hr.length; j++){
        for (let i=0; i<arr.length;i++){
            if (old_records_36hr[j]['locationName']==arr[i]['county']){
                old_records_36hr[j]['id']=arr[i]['id']
                records_36hr.push(old_records_36hr[j])
            }
        }
    }

    records_36hr.sort(function(a,b){
        return a.id-b.id
    })

    //挑各縣市的資訊細項
    for (let i = 0; i < records_36hr.length; i++){

        let row = records_36hr[i], part = records_36hr[i].id
        let locationName = row['locationName']
        let startTime = row['weatherElement'][0]['time'][0]['startTime'], endTime = row['weatherElement'][0]['time'][0]['endTime']
        let weather =  row['weatherElement'][0]['time'][0]['parameter']['parameterName'] 
        let minT =  row['weatherElement'][2]['time'][0]['parameter']['parameterName']+'°'+row['weatherElement'][2]['time'][0]['parameter']['parameterUnit']
        let maxT = row['weatherElement'][4]['time'][0]['parameter']['parameterName']+'°'+row['weatherElement'][4]['time'][0]['parameter']['parameterUnit']
        let date = startTime.split(' ')[0], startHr = parseInt(startTime.split(' ')[1].split(':'))


        if (Object.keys(weather_ob).length==0){
            if (startHr<6 || startHr>18){
                console.log('night',startTime)
                weather_ob['天氣描述']= whIcon['天氣描述']
                weather_ob['圖示'] = whIcon['夜晚圖示']
            }
            else{
                console.log('day',startTime)
                weather_ob['天氣描述']= whIcon['天氣描述']
                weather_ob['圖示'] = whIcon['白天圖示']
            }            
        }


        //製作日期div
        let dateDiv = document.querySelector('.index-date')
        if(dateDiv.innerHTML==''){
            dateDiv.appendChild(document.createTextNode(`${date}`))
        }

        //天氣描述與圖示連結
        for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
            if (weather_ob['天氣描述'][w] == weather){
                var iconUrl = weather_ob['圖示'][w] 
                console.log(locationName,weather,iconUrl)
            }
        }
        //製作縣市div
        let index_weather_cards = document.createElement('div')
        index_weather_cards.className='index-select-card'

        let index_city = document.createElement('div')
        index_city.className='index-city'
        index_city.appendChild(document.createTextNode(locationName))
        index_weather_cards.appendChild(index_city)

        let index_temp = document.createElement('div')
        index_temp.className='index-temp'
        index_temp.appendChild(document.createTextNode(minT))
        index_weather_cards.appendChild(index_temp)

        let index_weather_icon = document.createElement('div')
        index_weather_icon.className='index-temp'
        index_weather_icon.style.width='80px'
        index_weather_icon.style.height='80px'

        let img = document.createElement('img')
        img.src = iconUrl
        img.style.width='100%'
        img.style.height='100%'
        index_weather_icon.appendChild(img)
        index_weather_cards.appendChild(index_weather_icon)
        document.getElementById('index-weather-cards').appendChild(index_weather_cards)


        //將各縣市丟到東西南北區域
        whole_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather}) //全台
        if (part < 7){ //北部
            north_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather})
        }
        else if (7 <= part && part< 13){ //中部
            middle_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather})
        }
        else if (13 <= part && part < 16){ //南部
            south_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather})
        }
        else if (16 <= part && part < 19){ //東部
            east_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather})
        }
        else if (19 <= part && part< 22){ //離島
            offshore_bk.push({'locationName':locationName,'minT':minT,'maxT':maxT,'weather':weather})
        }        
    }

    //click button to block page
    let blocks = document.querySelectorAll('.index-select-area')
    for (let i=0; i<blocks.length; i++){
        blocks[i].addEventListener('click', function() {
            blockClick(i);
        })
    }
    
    //click town  to city.html
    let locationList = document.querySelectorAll('.index-select-card')
    for (let i = 0; i < locationList.length; i++){
        locationList[i].addEventListener('click',toCity)
    }


}



//click town link to city.html
function toCity(e){
    cityName = this.innerHTML.split(',')[0]
    location.href='../html/city.html'+`?city=${cityName}`

}


//製作各button東西南北的縣市資料
function blockClick(i){
    document.getElementById('index-weather-cards').innerHTML = ''
    console.log('-------')
    if (i == 0){ //全台
        for(let j = 0; j < whole_bk.length; j++){
            let locationName = whole_bk[j]['locationName'], minT = whole_bk[j]['minT'], maxT = whole_bk[j]['maxT'], weather = whole_bk[j]['weather']
            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
    
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
    
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
    
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
    
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)

        }
    }
    else if(i == 1){// 北部
        for(let j = 0; j < north_bk.length; j++){
            let locationName = north_bk[j]['locationName'], minT = north_bk[j]['minT'], maxT = north_bk[j]['maxT'], weather = north_bk[j]['weather']
            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
            
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
            
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
            
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
            
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)


        }
    }
    else if(i == 2){
        for(let j = 0; j < middle_bk.length; j++){
            let locationName = middle_bk[j]['locationName'], minT = middle_bk[j]['minT'], maxT = middle_bk[j]['maxT'], weather = middle_bk[j]['weather']
            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
            
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
            
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
            
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
            
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)


        }
    }
    else if(i == 3){
        for(let j = 0; j < south_bk.length; j++){
            let locationName = south_bk[j]['locationName'], minT = south_bk[j]['minT'], maxT = south_bk[j]['maxT'], weather = south_bk[j]['weather']

            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
            
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
            
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
            
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
            
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)
        }
    }
    else if(i == 4){
        for(let j = 0; j < east_bk.length; j++){
            let locationName = east_bk[j]['locationName'], minT = east_bk[j]['minT'], maxT = east_bk[j]['maxT'], weather = east_bk[j]['weather']

            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
            
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
            
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
            
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
            
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)
        }
    }
    else{
        for(let j = 0; j < offshore_bk.length; j++){
            let locationName = offshore_bk[j]['locationName'], minT = offshore_bk[j]['minT'], maxT = offshore_bk[j]['maxT'], weather = offshore_bk[j]['weather']

            for (let w=0; w< Object.keys(weather_ob['天氣描述']).length; w++){
                if (weather_ob['天氣描述'][w] == weather){
                    var iconUrl = weather_ob['圖示'][w] 
                    console.log(locationName,weather,iconUrl)
                }
            }
            //製作縣市div
            let index_weather_cards = document.createElement('div')
            index_weather_cards.className='index-select-card'
            
            let index_city = document.createElement('div')
            index_city.className='index-city'
            index_city.appendChild(document.createTextNode(locationName))
            index_weather_cards.appendChild(index_city)
            
            let index_temp = document.createElement('div')
            index_temp.className='index-temp'
            index_temp.appendChild(document.createTextNode(minT))
            index_weather_cards.appendChild(index_temp)
            
            let index_weather_icon = document.createElement('div')
            index_weather_icon.className='index-temp'
            index_weather_icon.style.width='80px'
            index_weather_icon.style.height='80px'
            
            let img = document.createElement('img')
            img.src = iconUrl
            img.style.width='100%'
            img.style.height='100%'
            index_weather_icon.appendChild(img)
            index_weather_cards.appendChild(index_weather_icon)
            document.getElementById('index-weather-cards').appendChild(index_weather_cards)
        }
    }

    //click town  to city.html
    let locationList = document.querySelectorAll('.index-select-card')
    for (let i = 0; i < locationList.length; i++){
        locationList[i].addEventListener('click',toCity)
    }

}


async function getFetch(url){
    try{
            let res =  await fetch(url)
            if (res.status === 200){
                let data = await res.json() 
                return data          
            }        
    }catch(e){console.log('GET 錯誤 >>', e)};
}

let arr =[{county:"基隆市",id:0},
{county:"臺北市",id:1},
{county:"新北市",id:2},
{county:"桃園市",id:3},
{county:"新竹市",id:4},
{county:"新竹縣",id:5},
{county:"苗栗縣",id:6},
{county:"臺中市",id:7},
{county:"彰化縣",id:8},
{county:"南投縣",id:9},
{county:"雲林縣",id:10},
{county:"嘉義市",id:11},
{county:"嘉義縣",id:12},
{county:"臺南市",id:13},
{county:"高雄市",id:14},
{county:"屏東縣",id:15},
{county:"宜蘭縣",id:16},
{county:"花蓮縣",id:17},
{county:"臺東縣",id:18},
{county:"澎湖縣",id:19},
{county:"金門縣",id:20},
{county:"連江縣",id:21},]


let whole_bk=[] ,north_bk=[], middle_bk=[], south_bk=[], east_bk=[], offshore_bk=[], weather_ob={}

index()