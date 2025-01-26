const getWeatherButton = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const extraInfo = document.getElementById('extraInfo');

getWeatherButton.addEventListener('click', () => {
  const location = document.getElementById('location').value.trim();

  if (location === '') {
    alert('Please enter a location');
    return;
  }

  // Fetching weather details using wttr.in API
  fetch(`https://wttr.in/${encodeURIComponent(location)}?format=%l~%c~%C~%t~%f~%h~%w~%p~%v~%S~%s`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Location not found or service unavailable.');
      }
      return response.text();
    })
    .then(data => {
      console.log('Raw API Data:', data); // Debugging log

      // Split the response into parts for parsing
      const parts = data.split('~');
      console.log('Parsed API Data:', parts);

      // Display the extracted details with proper labels and symbols
      if (parts.length === 11) {
        cityName.textContent = `📍 Location: ${parts[0]}`; // Location name
        description.innerHTML = `🌦️ Conditions: ${parts[1]} ${parts[2]}`; // Weather symbol and text
        temperature.textContent = `🌡️ Temperature: ${parts[3]}`; // Temperature
        extraInfo.innerHTML = `
          <p>🤗 <strong>Feels Like:</strong> ${parts[4]}</p>
          <p>💧 <strong>Humidity:</strong> ${parts[5]}</p>
          <p>💨 <strong>Wind Speed:</strong> ${parts[6]}</p>
          <p>🌧️ <strong>Precipitation:</strong> ${parts[7]}</p>
          <p>🔭 <strong>Visibility:</strong> ${parts[8]}</p>
          <p>🌅 <strong>Sunrise:</strong> ${parts[9]}</p>
          <p>🌇 <strong>Sunset:</strong> ${parts[10]}</p>
        `;

        // Ensure the weather result section is visible
        weatherResult.classList.remove('hidden');
      } else {
        alert('Unexpected response format. Please try again.');
      }
    })
    .catch(error => {
      weatherResult.classList.add('hidden');
      console.error('Error:', error); // Log the error
      alert(error.message);
    });
});
