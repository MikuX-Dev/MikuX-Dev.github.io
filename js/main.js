function dateTime() {
	const date = new Date();
	let today = date.toDateString();
	let time = date.toLocaleTimeString();
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

function weatherBalloonAutoDetect() {
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
					// Get latitude and longitude from the user's position
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					// Fetch weather data using the coordinates
					fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=912416a3726142366d9456d54cfd594b`)
							.then(function(resp) {
									return resp.json();
							})
							.then(function(data) {
									let weatherIcon = data.weather[0].icon;
									let tempK = parseFloat(data.main.temp);
									let tempC = Math.round(tempK - 273.15);
									let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
									document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempC + '&deg;C">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
							})
							.catch(function(error) {
									console.error('Error fetching weather data:', error);
							});
			}, function(error) {
					console.error('Error getting user location:', error);
			});
	} else {
			console.error('Geolocation is not supported by this browser.');
	}
}

function traichu() {
	dateTime();
	weatherBalloonAutoDetect();
}

