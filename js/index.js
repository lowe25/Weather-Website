//DOM SHITS
const container = document.querySelector(".container");
//TEXTS
const cityText = document.getElementById("cityText");
const countryText = document.getElementById("countryText");
const weatherCelcius = document.getElementById("weather-celcius");
const weatherFahren = document.getElementById("weather-fahren");
const precipitation = document.getElementById("preci");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

//TEXTBOXES
var txtSearch = document.getElementById("txt-city").value;

//BUTTONS
var btnSearch = document.getElementById("btn-city");
btnSearch.addEventListener("click", weather);

//API SHITS
//var key = apiKey.API_KEY;

function weather(e) {
  const api = `https://weatherapi-com.p.rapidapi.com/current.json?q=${txtSearch}`;
  //fetch(api,
  fetch(".netlify/functions/api", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
      //"x-rapidapi-key": key,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      codes(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function codes(data) {
  cityText.innerHTML = data.location.name;
  countryText.innerHTML = data.location.country;
  precipitation.innerHTML = `Precipitation: ${data.current.precip_in}%`;
  humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  weatherCelcius.innerHTML = `${data.current.temp_c}°C`;

  const btnCel = document.getElementById("celcius");
  btnCel.addEventListener("click", showCel);
  const btnFah = document.getElementById("fahren");
  btnFah.addEventListener("click", showFah);

  function showCel() {
    weatherCelcius.innerHTML = `${data.current.temp_c}°C`;
    weatherCelcius.style.display = "block";
    weatherFahren.style.display = "none";
  }
  function showFah() {
    weatherFahren.innerHTML = `${data.current.temp_f}°F`;
    weatherFahren.style.display = "block";
    weatherCelcius.style.display = "none";
  }
}

