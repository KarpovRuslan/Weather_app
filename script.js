const weatherBlock = document.querySelector('.js-weather');
const form = document.querySelector('.container__input');

form.addEventListener('submit', loadWeather);

async function loadWeather(evt) {
    evt.preventDefault();

    weatherBlock.innerHTML = `
    <div class="js-loader">
    <div class="js-weather__inner cssload-one"></div>
	<div class="js-weather__inner cssload-two"></div>
	<div class="js-weather__inner cssload-three"></div>
    </div>
    `;

    const KEY = '0834eb2f4c863f8ef02cb351893248f1';
    const query = evt.currentTarget.elements.query.value;
    const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${KEY}`;
    const response =  await fetch(server, { method: 'GET', });
    const responseResult =  await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}


    function getWeather(data) {
        const location = data.name;
        const temp = Math.round(data.main.temp);
        const humidity = Math.round(data.main.humidity);
        const weatherStatus = data.weather[0].main;
        const weatherIcon = data.weather[0].icon;

        const template = `
    <div class="weather__header">
    <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
    </div>
    <div class="weather__icon">
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
    </div></div>
    <div class="weather__tempBlock">
    <div class="weather__temp">${temp}°C</div>
    <div class="weather__humidity">Humidity: ${humidity}%</div>
    
    </div>
    `;

        weatherBlock.innerHTML = template;
    }

