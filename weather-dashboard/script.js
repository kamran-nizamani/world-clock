// ============================================
// Weather Dashboard Application
// ============================================

// OpenWeatherMap API Configuration
const API_KEY = 'e82b5a13de437d18c8a6b953d09b6b2c'; // Free tier API key
const BASE_URL = 'https://api.openweathermap.org';

// ============================================
// State Management
// ============================================

let appState = {
    currentWeather: null,
    forecast: null,
    savedCities: JSON.parse(localStorage.getItem('savedCities')) || [],
    settings: JSON.parse(localStorage.getItem('weatherSettings')) || {
        tempUnit: 'celsius',
        windUnit: 'ms',
        autoRefresh: 'off'
    },
    lastUpdated: null,
    autoRefreshInterval: null
};

// ============================================
// DOM Elements
// ============================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettings');
const saveSettingsBtn = document.getElementById('savSettingsBtn');
const tempUnitSelect = document.getElementById('tempUnit');
const windUnitSelect = document.getElementById('windUnit');
const autoRefreshSelect = document.getElementById('autoRefresh');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const forecastContainer = document.getElementById('forecastContainer');
const savedCitiesSection = document.getElementById('savedCitiesSection');
const savedCitiesContainer = document.getElementById('savedCitiesContainer');
const emptySavedCities = document.getElementById('emptySavedCities');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const closeErrorBtn = document.getElementById('closeError');
const loadingSpinner = document.getElementById('loadingSpinner');
const lastUpdatedSpan = document.getElementById('lastUpdated');

// ============================================
// Event Listeners
// ============================================

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('input', handleSearchInput);
searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSearch());
currentLocationBtn.addEventListener('click', handleCurrentLocation);
settingsBtn.addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', closeSettings);
saveSettingsBtn.addEventListener('click', saveSettings);
closeErrorBtn.addEventListener('click', closeError);

// ============================================
// Initialize App
// ============================================

function init() {
    loadSettings();
    renderSavedCities();
    
    // Load default city if no current weather
    if (!appState.currentWeather) {
        searchCity('London');
    }
}

// ============================================
// Search Functions
// ============================================

function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }

    // Simulate search suggestions (in production, use API)
    const suggestions = [
        'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
        'Dubai', 'Singapore', 'Toronto', 'Berlin', 'Mumbai',
        'Los Angeles', 'Chicago', 'Amsterdam', 'Barcelona', 'Rome'
    ];

    const filtered = suggestions.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }

    searchResults.innerHTML = filtered.map(city => `
        <div class="search-result-item" onclick="searchCity('${city}')">\n            <i class="fas fa-city"></i> ${city}
        </div>
    `).join('');

    searchResults.classList.remove('hidden');
}

function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        searchCity(city);
    }
}

function searchCity(city) {
    searchInput.value = city;
    searchResults.classList.add('hidden');
    fetchWeather(city);
}

function handleCurrentLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                hideLoading();
                showError('Unable to get your location. Please enable location access.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// ============================================
// API Functions
// ============================================

async function fetchWeather(city) {
    showLoading();
    try {
        // Get current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        appState.currentWeather = weatherData;

        // Get forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const forecastData = await forecastResponse.json();
        appState.forecast = forecastData;
        appState.lastUpdated = new Date();

        // Save city if not already saved
        saveCityToList(city);

        // Render UI
        renderCurrentWeather();
        renderForecast();
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    showLoading();
    try {
        // Get current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const weatherData = await weatherResponse.json();
        appState.currentWeather = weatherData;

        // Get forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const forecastData = await forecastResponse.json();
        appState.forecast = forecastData;
        appState.lastUpdated = new Date();

        // Save city if not already saved
        const cityName = weatherData.name;
        saveCityToList(cityName);

        // Render UI
        renderCurrentWeather();
        renderForecast();
        hideLoading();
    } catch (error) {
        hideLoading();
        showError('Unable to fetch weather data.');
    }
}

// ============================================
// Rendering Functions
// ============================================

function renderCurrentWeather() {
    const data = appState.currentWeather;
    const settings = appState.settings;

    // Convert temperature if needed
    let temp = data.main.temp;
    let feelsLike = data.main.feels_like;
    let tempUnit = '°C';

    if (settings.tempUnit === 'fahrenheit') {
        temp = (temp * 9/5) + 32;
        feelsLike = (feelsLike * 9/5) + 32;
        tempUnit = '°F';
    }

    // Convert wind speed if needed
    let windSpeed = data.wind.speed;
    let windUnit = 'm/s';

    if (settings.windUnit === 'kmh') {
        windSpeed = (windSpeed * 3.6).toFixed(1);
        windUnit = 'km/h';
    } else if (settings.windUnit === 'mph') {
        windSpeed = (windSpeed * 2.237).toFixed(1);
        windUnit = 'mph';
    }

    // Format date and time
    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format sunrise and sunset
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Get weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    // Update DOM
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = dateString;
    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(feelsLike)}${tempUnit}`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed} ${windUnit}`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.querySelector('.temp-unit').textContent = tempUnit;

    // Update last updated time
    const now = new Date();
    lastUpdatedSpan.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Show current weather section
    currentWeatherSection.classList.remove('hidden');
}

function renderForecast() {
    const data = appState.forecast;
    const settings = appState.settings;
    let tempUnit = '°C';

    if (settings.tempUnit === 'fahrenheit') {
        tempUnit = '°F';
    }

    // Group forecast by day (take 1 entry per day)
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = item;
        }
    });

    // Render forecast cards
    forecastContainer.innerHTML = Object.entries(dailyForecasts)
        .slice(0, 5)
        .map(([day, item]) => {
            let temp = item.main.temp;
            let tempMax = item.main.temp_max;
            let tempMin = item.main.temp_min;

            if (settings.tempUnit === 'fahrenheit') {
                temp = Math.round((temp * 9/5) + 32);
                tempMax = Math.round((tempMax * 9/5) + 32);
                tempMin = Math.round((tempMin * 9/5) + 32);
            }

            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

            return `
                <div class="forecast-card">
                    <div class="forecast-day">${day}</div>
                    <div class="forecast-icon">
                        <img src="${iconUrl}" alt="Weather icon">
                    </div>
                    <div class="forecast-temps">
                        <span class="forecast-max">${tempMax}${tempUnit}</span>
                        <span class="forecast-min">${tempMin}${tempUnit}</span>
                    </div>
                    <div class="forecast-desc">${item.weather[0].description}</div>
                </div>
            `;
        })
        .join('');

    forecastSection.classList.remove('hidden');
}

function renderSavedCities() {
    const cities = appState.savedCities;

    if (cities.length === 0) {
        savedCitiesContainer.innerHTML = '';
        emptySavedCities.style.display = 'block';
        return;
    }

    emptySavedCities.style.display = 'none';

    savedCitiesContainer.innerHTML = cities.map(city => `
        <div class="city-card" onclick="searchCity('${city.name}')">
            <button class="city-remove" onclick="event.stopPropagation(); removeCity('${city.name}')">
                <i class="fas fa-times"></i>
            </button>
            <div class="city-name">${city.name}</div>
            <div class="city-temp">${city.temp}°</div>
            <div class="city-weather">${city.weather}</div>
        </div>
    `).join('');
}

function saveCityToList(cityName) {
    const data = appState.currentWeather;
    const settings = appState.settings;

    let temp = Math.round(data.main.temp);
    if (settings.tempUnit === 'fahrenheit') {
        temp = Math.round((temp * 9/5) + 32);
    }

    const cityData = {
        name: cityName,
        temp: temp,
        weather: data.weather[0].description
    };

    // Check if city already exists
    const existingIndex = appState.savedCities.findIndex(c => c.name === cityName);
    if (existingIndex !== -1) {
        appState.savedCities[existingIndex] = cityData;
    } else {
        appState.savedCities.unshift(cityData);
    }

    // Keep only last 10 cities
    if (appState.savedCities.length > 10) {
        appState.savedCities.pop();
    }

    localStorage.setItem('savedCities', JSON.stringify(appState.savedCities));
    renderSavedCities();
}

function removeCity(cityName) {
    appState.savedCities = appState.savedCities.filter(c => c.name !== cityName);
    localStorage.setItem('savedCities', JSON.stringify(appState.savedCities));
    renderSavedCities();
}

// ============================================
// Settings Functions
// ============================================

function loadSettings() {
    tempUnitSelect.value = appState.settings.tempUnit;
    windUnitSelect.value = appState.settings.windUnit;
    autoRefreshSelect.value = appState.settings.autoRefresh;
}

function openSettings() {
    settingsModal.classList.remove('hidden');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function saveSettings() {
    appState.settings.tempUnit = tempUnitSelect.value;
    appState.settings.windUnit = windUnitSelect.value;
    appState.settings.autoRefresh = autoRefreshSelect.value;

    localStorage.setItem('weatherSettings', JSON.stringify(appState.settings));

    // Re-render weather data with new units
    if (appState.currentWeather) {
        renderCurrentWeather();
        renderForecast();
    }

    // Setup auto-refresh
    setupAutoRefresh();

    closeSettings();
    showSuccess('Settings saved successfully!');
}

function setupAutoRefresh() {
    // Clear existing interval
    if (appState.autoRefreshInterval) {
        clearInterval(appState.autoRefreshInterval);
    }

    const refreshMinutes = parseInt(appState.settings.autoRefresh);
    if (refreshMinutes > 0) {
        appState.autoRefreshInterval = setInterval(() => {
            if (appState.currentWeather) {
                fetchWeather(appState.currentWeather.name);
            }
        }, refreshMinutes * 60 * 1000);
    }
}

// ============================================
// UI Helper Functions
// ============================================

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(closeError, 5000);
}

function closeError() {
    errorMessage.classList.add('hidden');
}

function showSuccess(message) {
    // Create temporary success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successMsg.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #2ecc71;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.4s ease;
        z-index: 999;
    `;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (appState.autoRefreshInterval) {
        clearInterval(appState.autoRefreshInterval);
    }
});
