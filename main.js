const errorMessage = document.getElementById('error-message');

async function getWeather(location) {

    let locationURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=502754d1ea41ea0b58607d87003404a3';
    
    try {
        const response = await fetch(locationURL, {mode: 'cors'})
        const data = await response.json();

        if (data != undefined) {
            return {
                name: data.name,
                temp: Math.round(data.main.temp),
                weather: data.weather[0].main,
                weatherDescription: data.weather[0].description,
                max: Math.round(data.main.temp_max),
                min: Math.round(data.main.temp_min),
                dataInfo: data
            }
        }

        return undefined;

    } catch (error) {
        errorMessage.style.visibility = 'visible';
        console.log("Error", error);
    }
}

async function changeWeatherText(location) {

    const locationName = document.getElementById('location-name');
    const temp = document.getElementById('temp');
    const weather = document.getElementById('weather');
    const maxTemp = document.getElementById('max-temp');
    const minTemp = document.getElementById('min-temp');

    let weatherData = await getWeather(location);

    if (weatherData === undefined) {
        return;
    } else {
        errorMessage.style.visibility = 'hidden';
    }
    
    locationName.textContent = weatherData.name;
    temp.textContent = weatherData.temp + "°F";
    weather.textContent = weatherData.weather;
    maxTemp.textContent = "H:" + weatherData.max;
    minTemp.textContent = "L:" + weatherData.min;
}

function searchLocation() {
    const form = document.getElementById('location-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const location = (formData.get("location"));
        changeWeatherText(location);

    })
}

changeWeatherText("Elk Grove");
searchLocation();

