import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import WeatherDetailsCards from "./WeatherDetailsCards";
import WeatherDetailCard from "./WeatherDetailCard";
import WeatherOverViewCard from "./WeatherOverViewCard";
const WeatherProps = ({ weather, selectedPlace, country, units, selectedDay, setSelectedDay }) => {
  return (
    <div className=" grid grid-cols-1 grid-rows-[3fr_2fr_4fr_5fr] mt-6  md:grid-cols-[2fr_1fr] md:grid-rows-[3fr_1fr_2fr] md:gap-x-6 gap-y-4 md:gap-y-4 md:px-6 md:py-2 w-full h-full">
      <div className="bg-[url('/bg-today-small.svg')] md:bg-[url('/bg-today-large.svg')] rounded-2xl bg-cover bg-no-repeat bg-center">
        <WeatherOverViewCard
          selectedPlace={selectedPlace}
          weather={weather}
          country={country}
        />
      </div>
      <div className="bg-transparent">
        <WeatherDetailsCards weather={weather}  units={units}/>
      </div>
      <div className="bg-transparent">
        <DailyForecast weather={weather} />
      </div>
      <div className=" md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-4">
        <HourlyForecast weather={weather} selectedDay={ selectedDay} setSelectedDay={setSelectedDay}/>
      </div>
    </div>
  );
};

export default WeatherProps;
