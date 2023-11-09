document.getElementById('btn').addEventListener('click', function() {
    let city = document.getElementById('city-info').value;
    let apiKey = '8a94eb2dd29e9fff953ad68801259d7a'; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let weather = data.weather[0].description;
        let temp = data.main.temp;
        let windSpeed = data.wind.speed;

        // Create a new div element for the weather information
        let newWeatherDiv = document.createElement('div');
        newWeatherDiv.classList.add('weather-entry'); // Add a class for CSS

        // Set the innerHTML of the new div
        newWeatherDiv.innerHTML = `
            <p>The weather in ${city} is ${weather}.</p>
            <p>The temperature is ${temp} °C with a wind speed of ${windSpeed}m/s.</p>
        `;

        let weatherInfoContainer = document.getElementById('weather-info');

        // Insert the new div before the first child of weather-info
        weatherInfoContainer.insertBefore(newWeatherDiv, weatherInfoContainer.firstChild);

        // Clear the city input text box
        document.getElementById('city-info').value = '';
    })
    .catch(error => {
        console.log(error);
        document.getElementById('weather-info').innerHTML = `<p>Error getting weather data: ${error.message}</p>`;
    });
});