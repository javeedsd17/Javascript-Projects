const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidityValue = document.querySelector('.humidity-value');
const windSpeedValue = document.querySelector('.wind-speed');

async function checkWeather(city) {
    const api_key = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        // Temperature and other details
        temperature.innerHTML = `${data.main.temp}<sup>°C</sup>`;
        description.innerHTML = data.weather[0].description;
        humidityValue.innerHTML = `${data.main.humidity}%`;

        // Convert wind speed from m/s → km/h
        const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
        windSpeedValue.innerHTML = `${windSpeedKmh} km/h`;

        // Change image based on weather condition
        const condition = data.weather[0].main.toLowerCase(); // e.g., 'clouds', 'rain', 'clear'

        if (condition.includes("cloud")) {
            weather_img.src = "images/clouds.png";
        } else if (condition.includes("rain")) {
            weather_img.src = "images/rain.jpg";
        } else if (condition.includes("clear")) {
            weather_img.src = "images/clearsky.jpg";
        } else if (condition.includes("snow")) {
            weather_img.src = "images/snow.jpg";
        } else if (condition.includes("mist") || condition.includes("fog")) {
            weather_img.src = "images/mist.jpg";
        } else if (condition.includes("thunderstorm")) {
            weather_img.src = "images/thunder.jpg";
        } else {
            weather_img.src = "images/default.jpg"; // fallback image
        }

    } catch (error) {
        alert("Failed to fetch weather data");
        console.error(error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) checkWeather(city);
    else alert("Please enter a city name");
});

inputBox.addEventListener('keypress', (e) => {
    if (e.key === "Enter") checkWeather(inputBox.value.trim());
});
