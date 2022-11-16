function formateDateTime(timestamp){
  // calculate the date
  let date = new Date (timestamp);
  let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
  let day =days[ date.getDay()];
  let hours = date.getHours();
  if( hours < 10){
    hours = `0${hours}`;
   }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes=`0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
  

}

function showTemperature(response){
    let tempCelcius = document.querySelector("#celcius");
    tempCelcius.innerHTML = Math.round(response.data.main.temp);

      celciusTemperature = response.data.main.temp;


    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = response.data.name;

    let weatherDescription = document.querySelector("#weatherCondition");
    weatherDescription.innerHTML = response.data.weather[0].description;

    let humidityDescription = document.querySelector("#humidity");
    humidityDescription.innerHTML =response.data.main.humidity;

    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    let dateTime = document.querySelector("#date");
    dateTime.innerHTML = formateDateTime(response.data.dt*1000);
          

    let weatherIcon = document.querySelector("#icon");
    weatherIcon.setAttribute(
      "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      weatherIcon.setAttribute(
        "alt",response.data.weather[0].description
      );
}

function showCelciusTemp(event){
event.preventDefault();
let celciusTemp = document.querySelector("#celcius");
celciusTemp.innerHTML = Math.round(celciusTemperature);
celciusLink.classList.add("active");
farenheitLink.classList.remove("active");

}
let celciusLink = document.querySelector("#celcius-degree");
celciusLink.addEventListener("click", showCelciusTemp);

function displayFarenheitUnit(event){
event.preventDefault();
let celciusTemp = document.querySelector("#celcius");
// remove the active class
celciusLink.classList.remove("active");
// add active class
farenheitLink.classList.add("active");
let farenheitTemp = (celciusTemperature * 9) / 5 + 32;
celciusTemp.innerHTML =Math.round(farenheitTemp);
}
let farenheitLink = document.querySelector("#fahrenheit");
farenheitLink.addEventListener("click", displayFarenheitUnit);

function searchCity(city){
  let apiKey = `4d61ce254d40a5a039dc473a6c9b35bf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature); 
}

function HandleForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);

}
let celciusTemperature = null;
 searchCity("Dubai");

let form = document.querySelector("#form-search");
form.addEventListener("submit", HandleForm);
