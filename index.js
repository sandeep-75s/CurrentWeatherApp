let tab1 = document.querySelector('.tab1');
let tab2 = document.querySelector('.tab2');
let detailDiv = document.querySelector('.detail-div');
let searchDiv = document.querySelector('.search-div');
let loadingDiv = document.querySelector('.loading-animation-div')
let locationDiv = document.querySelector('.location-div');
const search = document.querySelector('.search');



function seaBtn(){
    detailDiv.style.display = 'none';
    loadingDiv.style.display = 'block flex';

    let city = search.value;
    fetchWeatherByCity(city);
}


searchDiv.style.visibility = "hidden";
detailDiv.style.display = "none";
loadingDiv.style.display = "none";
tab1.addEventListener('click',display1);
tab2.addEventListener('click',display2);


function display1(){
    detailDiv.style.display= 'none';
    locationDiv.style.display = 'none';
    searchDiv.style.visibility = "hidden";
    loadingDiv.style.display = "block flex";
    getLocation();
}
function display2(){
    detailDiv.style.display = 'none';
    searchDiv.style.visibility = "visible";
    locationDiv.style.display = 'none';
}

const x = document.getElementById("loc");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Your Device Goelocation not Support")
    }
    
  }
function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetchWeatherByLocation(lat,lon);
    x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}


async function fetchWeatherByLocation(lat  ,lon){
    try{
        locationDiv.style.display = 'none';
        loadingDiv.style.display='block flex';
        const APIkey = '4f22607ae5f09bb00084c491bf720400';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
        const data = await response.json();
        renderInfo(data);
    }
    catch(err){
        alert("Wrong City")
    }
}


async function fetchWeatherByCity(city){
    try{
        loadingDiv.style.display = 'block flex';
        const APIkey = '4f22607ae5f09bb00084c491bf720400';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
        const data = await response.json();
        loadingDiv.style.display = "none";
        renderInfo(data);
    }
    catch(err){
        alert("Wrong City")
    }

}

const cityName = document.querySelector(".city-name");
const flag = document.querySelector(".flag");
const weatherType = document.querySelector(".weather-type");
const weatherImage = document.querySelector(".weather-img");
const weatherTemp = document.querySelector(".weather-temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const cloud = document.querySelector(".cloud");


function renderInfo(data){
    locationDiv.style.display = 'none';
    loadingDiv.style.display = 'none';
    detailDiv.style.display = 'block flex';
    cityName.innerText = data?.name;
    flag.src = `http://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherType.innerText = data?.weather?.[0]?.main;
    weatherImage.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    weatherTemp.innerText = (data?.main?.temp-273.15).toFixed(2) + "°C";
    windSpeed.innerText = data?.wind?.speed+"Km/h";
    humidity.innerText = data?.main?.humidity+"%";
    cloud.innerText = data?.clouds?.all+"%";
}
