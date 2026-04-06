async function getWeather() {

  let city = document.getElementById("city").value;

  // Empty check
  if (city === "") {
    alert("Please enter a city");
    return;
  }

  let apiKey = "3847529f798453f64fd639ecff30721e";

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  try {
    let response = await fetch(url);
    let data = await response.json();

    // ❌ City not found check
    if (data.cod !== 200) {
      document.getElementById("weatherBox").innerHTML = "❌ City not found";
      return;
    }

    // 🌤️ Icon logic
    let icon = "";

    if (data.weather[0].main === "Clouds") icon = "☁️";
    else if (data.weather[0].main === "Clear") icon = "☀️";
    else if (data.weather[0].main === "Rain") icon = "🌧️";
    else icon = "🌫️";

    // ✅ Show on screen
    document.getElementById("weatherBox").innerHTML = `
      <h2>${data.name} ${icon}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].main}</p>
    `;

  } catch (error) {
    document.getElementById("weatherBox").innerHTML = "⚠️ Error fetching data";
  }
}