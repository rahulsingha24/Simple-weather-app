document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.getElementById('search-button');
    const locationInput = document.getElementById('location-input');

    const weatherInfoDiv = document.getElementById('weather-info');
    const errorMessageDiv = document = document.getElementById('error-message');

    const cityNameEl = document.getElementById('city-name');
    const temperatureEl = document.getElementById('temperature');
    const weatherConditionEl = document.getElementById('weather-condition');
    const weatherIconEl = document.getElementById('weather-icon');

    const feelsLikeEl = document.getElementById('feels-like');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');

    const getWeather = async (location) => {
        weatherInfoDiv.classList.add('hidden');
        errorMessageDiv.classList.add('hidden');

        if (!location) {
            errorMessageDiv.textContent = 'Please enter a location.';
            errorMessageDiv.classList.remove('hidden');
            return;
        }

        const url = `/api/weather?location=${encodeURIComponent(location)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'City not found');
            }
            const data = await response.json();
            updateUI(data);

        } catch (error) {
            errorMessageDiv.textContent = 'Could not find weather data for that location. Please try again.';
            errorMessageDiv.classList.remove('hidden');
            console.error('Fetch error:', error);
        }
    };

    const updateUI = (data) => {
        const { location, current } = data;

        cityNameEl.textContent = `${location.name}, ${location.country}`;
        temperatureEl.textContent = current.temp_c;
        weatherConditionEl.textContent = current.condition.text;
        weatherIconEl.src = `https:${current.condition.icon}`;
        weatherIconEl.alt = current.condition.text;

        feelsLikeEl.textContent = `${current.feelslike_c}°C`;
        humidityEl.textContent = `${current.humidity}%`;
        windSpeedEl.textContent = `${current.wind_kph} km/h`;

        weatherInfoDiv.classList.remove('hidden');
    };

    searchButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        getWeather(location);
    });

    locationInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const location = locationInput.value.trim();
            getWeather(location);
        }
    });
});