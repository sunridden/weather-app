async function getWeather(location) {

    let locationURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=502754d1ea41ea0b58607d87003404a3';
    
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
                time: getTime(data.timezone/3600, data.dt),
                dataInfo: data
            }
        }

        return undefined;

    } catch (error) {
        console.log("Error", error);
    }
}

function getTime(timeOffset, dt) {
    const currentTime = new Date((timeOffset + dt) * 1000);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
    const seconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const timeFormat = (hours + ":" + minutes + ":" + seconds + " " + ampm);
    return timeFormat;
}

async function changeText(location) {

    const locationName = document.getElementById('location');
    const temp = document.getElementById('temp');
    const weather = document.getElementById('weather');
    const maxTemp = document.getElementById('max-temp');
    const minTemp = document.getElementById('min-temp');

    let weatherData = await getWeather(location);

    if (weatherData === undefined) {
        //show error case
        return;
    }

    locationName.textContent = weatherData.name;
    temp.textContent = weatherData.temp + "°";
    weather.textContent = weatherData.weather;
    maxTemp.textContent = "H:" + weatherData.max;
    minTemp.textContent = "L:" + weatherData.min;

    console.log(weatherData.dataInfo);
    console.log(weatherData.time);
}

changeText('Elk Grove');


