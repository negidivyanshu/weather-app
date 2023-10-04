const apiKey = 'c6d31ed65e9240918a865609230410';
const weatherInfo = document.getElementById('weatherInfo'); // Declare weatherInfo once

// Function to handle the search
function performSearch() {
    const city = document.getElementById('cityInput').value;
    const unit = document.getElementById('unitSelect').value;

    // Fetch weather data from WeatherAPI
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            // Check if the response contains valid weather data
            if (data.error) {
                weatherInfo.innerHTML = `<p class="text-danger">${data.error.message}</p>`;
            } else {
                // Handle successful API response and update the UI
                const temperatureUnit = unit === 'metric' ? 'C' : 'F';
                const temperatureValue = unit === 'metric' ? data.current.temp_c : data.current.temp_f;
                weatherInfo.innerHTML = `
                    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
                    <p>Temperature: ${temperatureValue} °${temperatureUnit}</p>
                    <p>Weather: ${data.current.condition.text}</p>
                    <p>Humidity: ${data.current.humidity}%</p>
                    <p>Wind Speed: ${data.current.wind_kph} km/h</p>
                `;
            }
        })
        .catch(error => {
            // Handle API errors and display a message
            weatherInfo.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        });
}

// Event listener for the "Enter" key press in the city input field
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch(); // Calls the search function when Enter is pressed
    }
});

// Event listener for the "Search" button click
document.getElementById('searchBtn').addEventListener('click', performSearch);
