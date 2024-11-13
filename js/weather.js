// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = '156e11447dbb0683f94bd1567ad3a4df';
let weatherData = null; // Store fetched data globally

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    // Show loading message
    weatherResult.innerHTML = '<p>Loading weather data...</p>';

    if (city === '') {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod === 200) {
            weatherData = data; // Store the data globally
            displayBasicWeather(); // Display basic info initially
            document.getElementById('evenMoreInfoContainer').style.display = 'none'; // Hide even more info checkbox initially
        } else {
            throw new Error(`Error: ${data.message}`);
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>Failed to fetch weather data. ${error.message}</p>`;
    }
}

function displayBasicWeather() {
    const { main, weather, wind, clouds } = weatherData; // Use stored data
    const weatherResult = document.getElementById('weatherResult');

    weatherResult.innerHTML = `
        <h2>Weather Summary</h2>
        <div class="condition-data">
            <p><strong>Condition:</strong> ${weather[0].main}</p>
            <p><strong>Description:</strong> ${weather[0].description}</p>
            <p><strong>Cloudiness:</strong> ${clouds.all}%</p>
        </div>
        <div class="temperature-data">
            <p><strong>Temperature:</strong> ${main.temp}&deg;C</p>
        </div>
        <div class="wind-data">
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        </div>
    `;
}

function displayMoreWeather() {
    const { main, wind } = weatherData; // Use stored data
    const weatherResult = document.getElementById('weatherResult');

    const moreInfoHtml = `
        <h3>Additional Weather Details</h3>
        <div class="temperature-data">
            <p><strong>Feels Like:</strong> ${main.feels_like}&deg;C</p>
        </div>
        <div class="wind-data">
            <p><strong>Wind Gust:</strong> ${wind.gust ? `${wind.gust} m/s` : 'N/A'}</p>
        </div>
        <div class="condition-data">
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
        </div>
    `;

    weatherResult.insertAdjacentHTML('beforeend', moreInfoHtml);
}

function displayEvenMoreWeather() {
    const { main, sys } = weatherData; // Use stored data
    const weatherResult = document.getElementById('weatherResult');

    const evenMoreInfoHtml = `
        <h3>Detailed Weather Information</h3>
        <div class="temperature-data">
            <p><strong>Minimum Temperature:</strong> ${main.temp_min}&deg;C</p>
            <p><strong>Maximum Temperature:</strong> ${main.temp_max}&deg;C</p>
            <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
        </div>
        <div class="sunrise-sunset-data">
            <p><strong>Sunrise:</strong> ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> ${new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
    `;

    weatherResult.insertAdjacentHTML('beforeend', evenMoreInfoHtml);
}

function toggleMoreInfo() {
    const moreInfoChecked = document.getElementById('moreInfoCheckbox').checked;
    const evenMoreInfoContainer = document.getElementById('evenMoreInfoContainer');

    if (moreInfoChecked) {
        displayBasicWeather(); // Show basic info
        displayMoreWeather(); // Display additional info
        evenMoreInfoContainer.style.display = 'block'; // Make "Even More Info" checkbox visible
        document.getElementById('evenMoreInfoCheckbox').checked = false; // Uncheck "Even More Info" initially
    } else {
        displayBasicWeather(); // Only display basic info and hide "Even More Info" checkbox
        evenMoreInfoContainer.style.display = 'none';
    }
}

function toggleEvenMoreInfo() {
    const evenMoreInfoChecked = document.getElementById('evenMoreInfoCheckbox').checked;

    if (evenMoreInfoChecked) {
        displayBasicWeather(); // Show basic info
        displayMoreWeather(); // Show more info
        displayEvenMoreWeather(); // Display detailed info
    } else {
        displayBasicWeather(); // Show basic info
        displayMoreWeather(); // Show only the "More Info" level
    }
}
