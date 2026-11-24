const button = document.getElementById("showWeather");

button.addEventListener("click", async function () {
  const city = document.getElementById("city").value;
  const units = document.getElementById("units").value;

  const response = await fetch("/api/weather/" + city + "?units=" + units);
  const data = await response.json();

  const result = document.getElementById("result");

  if (response.ok) {
    result.innerHTML =
      "<h3>" + data.city + "</h3>" +
      "<p>Температура: " + data.temp + "°" + data.units + "</p>" +
      "<p>Погода: " + data.condition + "</p>";
  } else {
    result.textContent = "Город не найден";
  }
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}