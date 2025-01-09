document.getElementById("locationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    const baseURL =
        window.location.hostname === "127.0.0.1"
            ? "http://localhost:3000" // Local Vercel dev URL
            : "https://weather-middleware.vercel.app/"; // Hosted Vercel URL

    const apiUrl = `${baseURL}/getWeather?city=${city}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                throw new Error(data.error);
            }
            updateWeatherInfo(data);
        })
        .catch((error) => {
            alert(error.message);
            clearWeatherInfo(); // Clear UI on error
        });
});

function updateWeatherInfo(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${(data.wind.speed * 3.6).toFixed(2)} km/h`;

    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.classList.remove("hidden");
}

function clearWeatherInfo() {
    document.getElementById("cityName").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("description").textContent = "";
    document.getElementById("humidity").textContent = "";
    document.getElementById("windSpeed").textContent = "";

    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.classList.add("hidden");
}