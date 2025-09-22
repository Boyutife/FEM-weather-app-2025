import iconRain from "/icon-rain.webp";
import iconDrizzle from "/icon-drizzle.webp";
import iconFog from "/icon-fog.webp";
import iconStorm from "/icon-storm.webp";
import iconSnow from "/icon-snow.webp";
import iconSunny from "/icon-sunny.webp";
import iconOvercast from "/icon-overcast.webp";
import iconPartlyCloud from "/icon-partly-cloudy.webp";

const WeatherOverViewCard = ({ country, weather }) => {
  if (!weather || !weather.hourly) {
    return  <div className="flex w-full h-full bg-neutral-800 rounded-xl" />;
  }
  const formatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getWeatherIcon = (code) => {
    switch (true) {
      case code === 0:
        return iconSunny;
      case [1, 2, 3].includes(code):
        return iconPartlyCloud;
      case [45, 48].includes(code):
        return iconFog;
      case [51, 53, 55].includes(code):
        return iconDrizzle;
      case [61, 63, 65].includes(code):
        return iconRain;
      case [71, 73, 75, 77, 85, 86].includes(code):
        return iconSnow;
      case [95, 96, 99].includes(code):
        return iconStorm;
      default:
        return "🌍";
    }
  };

  const temp = weather?.hourly?.temperature_2m?.[0]

  return (
    <div className="flex flex-col  items-center h-full p-5 text-white justify-center md:justify-between md:flex-row">
      <div>
        <p className="font-bold text-2xl">{`${country.name}, ${country.country}`}</p>
        <p className="text-sm text-center md:text-left">{formatted}</p>
      </div>
      <div className="flex items-center space-x-5">
        <img
          src={getWeatherIcon(weather.hourly.weathercode[0])}
          alt="weather icon"
          className="h-20"
        />
        <i className="text-6xl">{temp} &deg;</i>
      </div>
    </div>
  );
};

export default WeatherOverViewCard;
