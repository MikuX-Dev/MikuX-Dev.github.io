function dateTime() {
	const date = new Date();
	let today = date.toDateString();
	let time = date.toLocaleTimeString();
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

// function weatherBalloon(cityID) {
// 	var apiKey = '912416a3726142366d9456d54cfd594b'; //OpenWeather API key
// 	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey)
// 		.then(function(resp) {
// 			return resp.json()
// 		})
// 		.then(function(data) {
// 			let weatherIcon = data.weather[0].icon;
// 			let tempK = parseFloat(data.main.temp);
// 			let tempC = Math.round(tempK - 273.15);
// 			let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
// 			document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempC + '&deg;C">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
// 		});
// }

// function traichu() {
// 	dateTime();
// 	weatherBalloon(1273865); //OpenWeather city ID
// }


function weatherBalloon(cityID) {
	fetch('https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=' + cityID + '&apikey=YOUR_API_KEY')
		.then(function(resp) {
			return resp.json();
		})
		.then(function(locationData) {
			let locationKey = locationData.Key;
			fetch('https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=YOUR_API_KEY')
				.then(function(resp) {
					return resp.json();
				})
				.then(function(weatherData) {
					let weatherIcon = weatherData[0].WeatherIcon;
					let tempC = weatherData[0].Temperature.Metric.Value;
					let tempF = weatherData[0].Temperature.Imperial.Value;
					document.getElementById('weather').innerHTML = '<p id="location">' + locationData.EnglishName + '</p><p id="details" ' + 'title="' + tempC + '&deg;C">' + '<img src="https://www.accuweather.com/images/weathericons/' + weatherIcon + '.svg">' + weatherData[0].WeatherText + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
				});
		});
}

function traichu() {
	dateTime();
	// Use the latitude and longitude of the desired location instead of city ID
	weatherBalloon('latitude,longitude');
}
