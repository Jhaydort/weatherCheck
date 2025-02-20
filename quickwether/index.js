let Form = document.getElementById("form")
let locationEnter = document.getElementById("location-input")
let checkWeather = document.getElementById("submit")
let checkedLocation = document.getElementById("location-city")
let Date = document.getElementById("date-time")
let TempVal = document.getElementById("temp")
let weDescrip = document.getElementById("wether-descrip")
let windSpreed = document.getElementById("wind-spreed")
let Humidity= document.getElementById("humidity" )



function getDayWithSuffix(day) {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1: return day + "st";
      case 2: return day + "nd";
      case 3: return day + "rd";
      default: return day + "th";
    }
};


function getLocalTime(unixTime, timezoneOffset) {
    
    const localTime = new window.Date((unixTime + timezoneOffset) * 1000);

    
    const day = getDayWithSuffix(localTime.getUTCDate());
    const month = localTime.toLocaleString('en-US', { month: 'long' });
    const year = localTime.getUTCFullYear();
    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 

    
    return `${day}, ${month} ${year} at ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}




Form.addEventListener("submit", function(event){
    event.preventDefault()
    const City =locationEnter.value;
    const ApiKey ='9be9272667178d737bee077c00eddf61';
    const endPoint= `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${ApiKey}`;
    let weatherReq = new XMLHttpRequest();
    weatherReq.open("GET", endPoint, true);
    weatherReq.onreadystatechange= function(){
        if(weatherReq.readyState ===4 && weatherReq.status ===200){
            const weatherData = JSON.parse(weatherReq.responseText)
            

            const ChangeName = weatherData.name;
            const Temp =Math.round(weatherData.main.temp)
            const WindDessp = weatherData.weather[0].description
            const WindSPreeed = weatherData.wind.speed
            const Hummdity = weatherData.main.humidity
            const unixTime = weatherData.dt;            
            const timezoneOffset = weatherData.timezone;
            const localDateTime = getLocalTime(unixTime, timezoneOffset);



            checkedLocation.innerHTML=ChangeName;
            TempVal.innerHTML = Temp
            weDescrip.innerHTML =WindDessp
            windSpreed.innerHTML = `${WindSPreeed} km/h`
            Humidity.innerHTML =`${Hummdity} %`
            Date.innerHTML =localDateTime


        }
        






        

            
    }

    weatherReq.send()


})