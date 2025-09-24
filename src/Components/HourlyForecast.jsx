import dropdown from '/icon-dropdown.svg'
import iconRain from "/icon-rain.webp";
import iconDrizzle from "/icon-drizzle.webp";
import iconFog from "/icon-fog.webp";
import iconStorm from "/icon-storm.webp";
import iconSnow from "/icon-snow.webp";
import iconSunny from "/icon-sunny.webp";
import iconOvercast from "/icon-overcast.webp";
import iconPartlyCloud from "/icon-partly-cloudy.webp";



const HourlyForecast = ({ weather, selectedDay, setSelectedDay, loading }) => {

  const SkeletonItem = () => (
  <div className="w-full h-8 bg-neutral-700 p-2 rounded-md animate-pulse" />
);

  if (loading) {
    return (
      <div className="flex w-full h-full text-white p-2 rounded-xl bg-neutral-800 flex-col">
      <header className="flex justify-between items-center w-full">
        <h3>Hourly forecast</h3>
        {
          <div className='flex space-x-4 rounded-lg bg-neutral-600 p-2 text-sm'>
            <p>-</p>
            <img src={dropdown} alt="icon dropdown" />
          </div>
        }
      </header>
      <main className="flex-1 flex justify-between mt-4 w-full">
        <ul
          className="flex flex-col space-y-3 w-full max-h-96 overflow-y-auto "
        >
          {
            Array.from({ length: 10 }).map((_, i) => (<SkeletonItem key={ i} />))
          }
        </ul>
      </main>
    </div>)}

  if (!weather || !weather.hourly) {
    return null;
  }
 
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



  const hoursForSelectedDay = weather.hourly.time
    .map((time, i) => {
      const date = new Date(time);
      const dateStr = date.toISOString().split("T")[0];
      return {
        time: date,
        temp: weather.hourly.temperature_2m[i],
        code: weather.hourly.weathercode[i],
        day: dateStr,
      };
    })
    .filter((h) => h.day === selectedDay);

  return (
    <div className="flex w-full h-full text-white p-2 rounded-xl bg-neutral-800 flex-col">
      <header className="flex justify-between items-center w-full">
        <h3>Hourly forecast</h3>
        {
              <select
          className="flex rounded-lg bg-neutral-600 p-2 text-sm"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {weather.daily.time.map((date, i) => (
            <option key={i} value={date}>
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </option>
          ))}
        </select>
          
        }
      </header>
      <main className="flex-1 flex justify-between mt-4 w-full">
        <ul
          className="flex flex-col space-y-3 w-full max-h-96 overflow-y-auto "
        >
          {hoursForSelectedDay.length > 0 ? (
            hoursForSelectedDay.map((h, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-neutral-700 p-2 rounded-md"
              >
                <div className="flex space-x-2">
                  <img
                    src={getWeatherIcon(h.code)}
                    alt="weather icon"
                    className="w-5 h-5"
                  />
                  <p className="text-xs">
                    {h.time.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
                <p>{Math.round(h.temp)}&deg;</p>
              </li>
            ))
          ) : (
            <p className="text-sm text-neutral-400">Select a day</p>
          )
          }
        </ul>
      </main>
    </div>
  );
};

export default HourlyForecast;
