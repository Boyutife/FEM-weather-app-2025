# FEM-weather-app-2025

# Frontend Mentor - Weather App Solution

This is a solution to the [Weather App challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

* [Overview](#overview)

  * [The Challenge](#the-challenge)
  * [Screenshot](#screenshot)
  * [Links](#links)
* [My Process](#my-process)

  * [Built With](#built-with)
  * [What I Learned](#what-i-learned)
  * [Continued Development](#continued-development)
  * [Useful Resources](#useful-resources)
* [Author](#author)
* [Acknowledgments](#acknowledgments)

---

## Overview

### The Challenge

Users should be able to:

* Search for weather information by entering a location in the search bar.
* View current weather conditions including temperature, weather icon, and location details.
* See additional weather metrics like "feels like" temperature, humidity, wind speed, and precipitation.
* Browse a **7-day weather forecast** with daily high/low temperatures and weather icons.
* View an **hourly forecast** showing temperature changes throughout the day.
* Switch between days in the hourly forecast.
* Toggle between **metric and imperial units** (Celsius/Fahrenheit, km/h or mph, etc.).
* View an optimal layout across different screen sizes.
* See hover and focus states for all interactive elements.

### Screenshot

![Weather App Screenshot](./Screenshot.png)

---

### Links

* Solution URL: [Add solution URL here](https://your-solution-url.com)
* Live Site URL: [Add live site URL here](https://your-live-site-url.com)

---

## My Process

### Built With

* Semantic **HTML5** markup
* **CSS custom properties**, Flexbox & CSS Grid
* **React** (for UI and state management)
* **Vite** (for fast development build)
* **Open-Meteo API** (weather data)
* **BigDataCloud Reverse Geocoding API** (location names)
* Mobile-first workflow

---

### What I Learned

Working on this project gave me hands-on practice with:

* Fetching data from **multiple APIs** (Open-Meteo for weather and BigDataCloud/Nominatim for reverse geocoding).
* Handling **CORS issues** and learning how to choose APIs that support frontend use.
* Displaying **hourly vs daily forecasts** with dynamic rendering.
* Implementing a **unit toggle** (Celsius ↔ Fahrenheit, km/h ↔ mph).
* Improving **responsive layouts** with CSS Grid and Flexbox.

Example: dynamically switching temperature units in JavaScript:

```js
const convertTemp = (temp, unit) => {
  return unit === "imperial"
    ? Math.round((temp * 9) / 5 + 32) // Celsius → Fahrenheit
    : Math.round(temp); // already Celsius
};
```

---

### Continued Development

In the future, I’d like to:

* Add **geolocation detection** so the app automatically shows the user’s current weather.
* Improve **error handling** for invalid searches or API failures.
* Add **dark mode** for better accessibility.
* Cache API responses for faster reloads.

---

### Useful Resources

* [Open-Meteo API Docs](https://open-meteo.com/) – Main source of weather data.
* [BigDataCloud Reverse Geocoding](https://www.bigdatacloud.com/geocoding-apis/reverse-geocode-to-city-api) – Free reverse geocoding with CORS support.
* [MDN Web Docs](https://developer.mozilla.org/) – Always handy for JavaScript and CSS references.

---

## Author

* Frontend Mentor – [@Boyutife](https://www.frontendmentor.io/profile/Boyutife)
* Twitter – [@Boluwatife_ven](https://twitter.com/boluwatife_ven)

---

## Acknowledgments

Big thanks to **Open-Meteo** and **BigDataCloud** for providing free APIs that made this project possible.

