import iconRain from "/icon-rain.webp";
import iconDrizzle from "/icon-drizzle.webp";
import iconFog from "/icon-fog.webp";
import iconStorm from "/icon-storm.webp";
import iconSnow from "/icon-snow.webp";
import iconSunny from "/icon-sunny.webp";
import iconOvercast from "/icon-overcast.webp";
import iconPartlyCloud from "/icon-partly-cloudy.webp";

const DailyForecast = ({ weather, loading }) => {

  if (loading) {
    return (
      <div className="flex flex-col w-full h-full text-white space-y-2">
      <h3>Daily forecast</h3>
        <div className="flex-1 grid grid-cols-3 md:grid-cols-7 gap-2">
          {
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-full h-full bg-neutral-700 rounded-md animate-pulse"></div>
            ))
          }
        </div>
        </div>
    )
  }

  if (!weather) { return null };

  const dailyWeather = weather.daily;

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
        return iconOvercast;
    }
  };

  const dayAbbr = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  
const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

  return (
    <div className="flex flex-col w-full h-full text-white space-y-2">
      <h3>Daily forecast</h3>
      <div className="flex-1 grid grid-cols-3 md:grid-cols-7 gap-2">
        {dailyWeather.time.map((date, i) => {
          const maxTemp = dailyWeather.temperature_2m_max[i]
          const minTemp = dailyWeather.temperature_2m_min[i]
          return(
          <div
              key={date}
              className={`w-full h-full bg-neutral-700 rounded-lg text-white flex flex-col text-center px-4 py-2 justify-between`}
          >
             <p>{dayAbbr(date)}</p>
            <img
              src={getWeatherIcon(dailyWeather.weathercode[i])}
              alt="weather icon"
              className="w-10 h-10 mx-auto"
            />
            <div className="flex justify-between text-sm">
              <p>{Math.round(maxTemp)}°</p>
              <p>{Math.round(minTemp)}°</p>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
