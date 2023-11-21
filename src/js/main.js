function updateSearchSuggestions(query) {
	var suggestionsList = document.getElementById('search-suggestions');
	suggestionsList.innerHTML = '';

	// Use Google Auto Suggestion API to fetch suggestions
	fetch('https://www.google.com/complete/search?q=' + query)
			.then(response => response.json())
			.then(data => {
					var suggestions = data[1];
					suggestions.forEach(function(suggestion) {
							var listItem = document.createElement('li');
							listItem.textContent = suggestion;
							suggestionsList.appendChild(listItem);
					});
			});
}

document.getElementById('q').addEventListener('input', function() {
	var query = this.value;
	updateSearchSuggestions(query);
});

function dateTime() {
	const date = new Date();
	let today = date.toDateString();
	let time = date.toLocaleTimeString();
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

function weatherBalloon(cityID) {
	var apiKey = '912416a3726142366d9456d54cfd594b'; //OpenWeather API key
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey)
		.then(function(resp) {
			return resp.json()
		})
		.then(function(data) {
			let weatherIcon = data.weather[0].icon;
			let tempK = parseFloat(data.main.temp);
			let tempC = Math.round(tempK - 273.15);
			let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
			document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempC + '&deg;C">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
		});
}

function traichu() {
	dateTime();
	weatherBalloon(1273865); //OpenWeather city ID
}

