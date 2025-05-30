const apiKey = 'c5c4e662d4044fbcbb3133825253005';
const weatherInfo = document.getElementById('weatherInfo');
document.getElementById('searchBtn').addEventListener('click', performSearch);

console.log("JS is running!");

// Function to handle the search
function performSearch() {
    const city = document.getElementById('cityInput').value.trim();
    const unit = document.getElementById('unitSelect').value;

    if (!city) {
        weatherInfo.innerHTML = `<p class="text-danger">Please enter a city name.</p>`;
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherInfo.innerHTML = `<p class="text-danger">${data.error.message}</p>`;
            } else {
                const temperatureValue = unit === 'metric' ? data.current.temp_c : data.current.temp_f;
                const temperatureUnit = unit === 'metric' ? 'C' : 'F';

                weatherInfo.innerHTML = `
                    <div class="card bg-light shadow-sm p-4">
                        <div class="d-flex align-items-center mb-3">
                            <img src="https:${data.current.condition.icon}" alt="Weather Icon" class="mr-3" style="width: 50px; height: 50px;">
                            <h4 class="mb-0">📍 ${data.location.name}, ${data.location.country}</h4>
                        </div>
                        <ul class="list-unstyled mb-0">
                            <li>🌡️ <strong>Temperature:</strong> ${temperatureValue} °${temperatureUnit}</li>
                            <li>☁️ <strong>Condition:</strong> ${data.current.condition.text}</li>
                            <li>💧 <strong>Humidity:</strong> ${data.current.humidity}%</li>
                            <li>🌬️ <strong>Wind:</strong> ${data.current.wind_kph} km/h</li>
                        </ul>
                    </div>
                `;
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        });
}

// Trigger search on "Enter" key
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});





