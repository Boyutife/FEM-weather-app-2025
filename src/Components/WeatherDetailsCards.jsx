const WeatherDetailsCards = ({ weather, units, loading }) => {

if (loading) {
    
    return (
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Feels Like", "Humidity", "Wind", "Precipitation"].map((label, index) => (
          <div
            key={index}
            className="w-full h-full bg-neutral-700 rounded-lg text-white flex flex-col text-left px-4 py-2 justify-between animate-pulse"
          >
            <p className="text-base">{label}</p>
            <p className="text-2xl">-</p>
          </div>
        ))}
      </div>
    );
  }


  if (!weather || !weather.hourly) {
    return null;
  }

 const feelsLike = weather.hourly.apparent_temperature[0];
  const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

    const details = [
    {
      label: "Feels Like",
      value: `${units.temperature === "C" ? feelsLike : toFahrenheit(feelsLike)}°`,
    },
    {
      label: "Humidity",
      value: `${weather.hourly.relative_humidity_2m[0]}%`,
    },
    {
      label: "Wind",
      value: `${weather.hourly.wind_speed_10m[0]} ${units.wind === "km/h" ? "km/h" : "mph"}`,
    },
    {
      label: "Precipitation",
      value: `${weather.hourly.precipitation[0]} ${units.precipitation === "mm" ? "mm" : "in"}`,
    },
  ];


  return (
    <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((item, index) => (
  <div
    key={index}
    className={`w-full h-full bg-neutral-700 rounded-lg text-white flex flex-col text-left px-4 py-2 justify-between`}
  >
    <p className="text-base">{item.label}</p>
          <p className="text-2xl">{ item.value}</p>
  </div>
))}
    </div>
  );
};

export default WeatherDetailsCards;

