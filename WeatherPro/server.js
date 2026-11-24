const express = require("express");
const app = express();

const cities = {
  moscow: { city: "Moscow", temp: 23, condition: "clear" },
  london: { city: "London", temp: 16, condition: "cloudy" },
  paris: { city: "Paris", temp: 21, condition: "sunny" },
  tokyo: { city: "Tokyo", temp: 27, condition: "rain" },
  berlin: { city: "Berlin", temp: 19, condition: "cloudy" }
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/api/weather/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const weather = cities[city];

  if (!weather) {
    return res.status(404).json({ error: "City not found" });
  }

  let temp = weather.temp;
  let units = "C";

  if (req.query.units === "imperial") {
    temp = temp * 9 / 5 + 32;
    units = "F";
  }

  res.json({
    city: weather.city,
    temp: Math.round(temp),
    units: units,
    condition: weather.condition
  });
});

app.listen(3000, () => {
  console.log("WeatherPro работает: http://localhost:3000");
});
