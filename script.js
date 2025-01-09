document.getElementById("locationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
  
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;
  
    const apiKey = "527884c3e2f795d9b567b4d7bcf6c0ed";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        updateWeatherInfo(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  
  function updateWeatherInfo(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("windSpeed").textContent = (data.wind.speed * 3.6).toFixed(2);
  
    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.classList.remove("hidden");
  }