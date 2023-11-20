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


function getWeatherByCoordinates(latitude, longitude) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
	
	fetch(apiUrl)
			.then(function (resp) {
					return resp.json();
			})
			.then(function (data) {
					let weatherIcon = data.weather[0].icon;
					let tempK = parseFloat(data.main.temp);
					let tempC = Math.round(tempK - 273.15);
					let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
					document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempC + '&deg;C">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
			})
			.catch(function (error) {
					console.error('Error fetching weather:', error);
			});
}

function traichu() {
	dateTime();

	// Use navigator.geolocation to get user's coordinates
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;

					// Call the weather function with the coordinates
					getWeatherByCoordinates(latitude, longitude);
			}, function (error) {
					console.error('Error getting location:', error);
			});
	} else {
			console.error('Geolocation is not supported by this browser.');
	}
}
