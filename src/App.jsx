import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Search from "./Components/Search";
import iconError from '/icon-error.svg'
import iconRetry from '/icon-retry.svg'
import WeatherProps from "./Components/WeatherProps";
import { useState, useEffect } from "react";

const App = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [selectedDay, setSelectedDay] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [country, setCountry] = useState({ name: null, country: null });
  const [units, setUnits] = useState({
  temperature: "C",
  wind: "km/h",
  precipitation: "mm",
});
const [isMetric, setIsMetric] = useState(true);

const [rawWeather, setRawWeather] = useState(null);
const [weather, setWeather] = useState(null);


  const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);
const toMph = (kmh) => Math.round(kmh / 1.609);
const toInches = (mm) => Math.round(mm / 25.4);



  useEffect(() => {
  if (!navigator.geolocation) {
    console.error("Geolocation not supported, using fallback...");
    setSelectedPlace("Berlin");
    setCountry({ name: "Berlin", country: "Germany" });
    setCoords({ lat: 52.52, lon: 13.405 });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );

        if (!res.ok) throw new Error("Failed to fetch location data");

        const data = await res.json();

        setSelectedPlace(data.city);
        setCountry({ name: data.city, country: data.countryName });
        setCoords({ lat, lon });
      } catch (err) {
        console.error("Error fetching location:", err);

        
        setSelectedPlace("Berlin");
        setCountry({ name: "Berlin", country: "Germany" });
        setCoords({ lat: 52.52, lon: 13.405 });
      }
    },
    (error) => {
      console.error("Geolocation error:", error);

      
      setSelectedPlace("Berlin");
      setCountry({ name: "Berlin", country: "Germany" });
      setCoords({ lat: 52.52, lon: 13.405 });
    },
    { timeout: 10000 }
  );
  }, []);
  
  const fetchWeather = async () => {
      setLoading(true)
      setError(false)

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weathercode&timezone=auto`,
        );

        if (!res.ok) {
          throw new Error ("Weather fetch failed")
        }
        const data = await res.json();
        setRawWeather(data)
        
      } catch (error) {
        console.error(error);
        setError(true)
      } finally {
        setLoading(false)
      }
  };


  useEffect(() => {
  if (!coords.latitude || !coords.longitude) return;
  fetchWeather();
  }, [coords]); 
  
 useEffect(() => {
  if (!rawWeather) return;

  const convertedData = {
    ...rawWeather,
    daily: {
      ...rawWeather.daily,
      temperature_2m_max: rawWeather.daily.temperature_2m_max.map((t) =>
        units.temperature === "C" ? t : toFahrenheit(t)
      ),
      temperature_2m_min: rawWeather.daily.temperature_2m_min.map((t) =>
        units.temperature === "C" ? t : toFahrenheit(t)
      ),
    },
    hourly: {
      ...rawWeather.hourly,
      temperature_2m: rawWeather.hourly.temperature_2m.map((t) =>
        units.temperature === "C" ? t : toFahrenheit(t)
      ),
      wind_speed_10m: rawWeather.hourly.wind_speed_10m.map((w) =>
        units.wind === "km/h" ? w : toMph(w)
      ),
      precipitation: rawWeather.hourly.precipitation.map((p) =>
        units.precipitation === "mm" ? p : toInches(p)
      ),
    },
  };

  setWeather(convertedData);
}, [units, rawWeather]);

  return (
    <>
      <div className="min-h-screen w-screen bg-neutral-900 md:px-20 px-5 py-5  font-bricolage flex flex-col items-center ">
        <section className="flex flex-col items-center w-full">
          <Header
            units={units}
            setUnits={setUnits}
            isMetric={isMetric}
            setIsMetric={setIsMetric}
            error = {error}
          />
          <Hero error={error} />
          <Search
            coords={coords}
            setCoords={setCoords}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            country={country}
            setCountry={setCountry}
            error={error}
          />
        </section>
       <section className="flex-1 w-[90%] md:w-[75%]">
  {loading && (
    <div className="flex justify-center items-center h-64 text-gray-500">
      Loading weather data...
    </div>
  )}

  {error && (
            <div className="flex flex-col items-center justify-center h-64 text-neutral-0 space-y-4">
              <img src={iconError} alt="error icon" className="md:w-10" />
      <h2 className="text-2xl font-bold md:text-4xl">Something went wrong</h2>
              <p className="text-sm text-gray-400 text-pretty md:text-xl">We couldn't connect to the server (API error). Please try again in a few moments.</p>
              <button  type="button"
        className="flex space-x-2 bg-neutral-800 py-1 focus:border-[1px] px-2 rounded-md focus:border-neutral-0 md:mt-4"
        onClick={() =>fetchWeather()}>
                <img src={iconRetry} alt="retry icon" className="w-4" />
                <p>Retry</p>
              </button>
    </div>
  )}

  {!loading && !error && weather && (
    <WeatherProps
      selectedPlace={selectedPlace}
      country={country}
      weather={weather}
      units={units}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
    />
  )}
</section>

      </div>
    </>
  );
};

export default App;
