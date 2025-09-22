import searchIcon from "/icon-search.svg";
import loadingIcon from "/icon-loading.svg";
import { useEffect, useState } from "react";
const Search = ({
  setCoords,
  selectedPlace,
  setSelectedPlace,
  setCountry,
  error
}) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSelectedPlace(query);
  };

  useEffect(() => {
    if (!selectedPlace) return;

    const controller = new AbortController();
    let mounted = true;

    const fetchCoords = async () => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${selectedPlace}&count=1&language=en&format=json`;
      setSearching(true);
      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`GeoCode API Error : ${res.status}`);
        }

        const data = await res.json();

        const place = data.results?.[0];

        if (!place) {
          console.log("No geocoding result for :", selectedPlace);
          return;
        }

        if (mounted) {
          setCoords({ latitude: place.latitude, longitude: place.longitude });
          setCountry({ name: place.name, country: place.country });
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Error fetching coords:", error);
      } finally {
        setSearching(false);
      }
    };

    fetchCoords();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [selectedPlace]);

  return (
    <>
      {
        !error && (
    <form
      onSubmit={handleSubmit}
      className="search-input relative flex flex-col items-center  justify-center space-y-2  md:grid md:grid-cols-[2fr_1fr]   md:space-y-0 w-[90%] md:w-[50%] ]"
    >
      <label
        htmlFor="search "
        className="flex space-x-1 bg-neutral-800  p-2 rounded-lg w-full border-neutral-0 focus-within:border-[1px]"
      >
        <img src={searchIcon} alt="search icon" className="w-5 mx-4" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a place ..."
          className="pl-2 bg-transparent text-lg outline-none text-white flex-1 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="search-btn bg-blue-700 w-full  rounded-lg p-2 text-white md:w-1/2 md:ml-12 border-neutral-0  focus:border-[3px] outline-none"
      >
        Search
      </button>

      {searching && (
        <div className=" absolute flex space-x-1 bg-neutral-800  p-2 rounded-lg  text-white bottom-5 w-full md:-bottom-full md:left-6 md:w-[61.2%]">
          <img src={loadingIcon} alt="loading icon" className="w-5 mx-4" />
          <p>Search in progress</p>
        </div>
      )}
    </form>)
    }
    </>
  );
};

export default Search;
