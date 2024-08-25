"use client";
import LocalityData from "@/data/localityData";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

interface Suggestion {
  cityName: string;
  localityName: string;
  localityId: string; // Assuming localityId is part of the Suggestion object
}

function SearchBox({
  weatherData,
  setWeatherData,
  headInputValue,
  setHeadInputValue,
}) {
  const [suggestions, setSuggestions] = useState<(Suggestion | string)[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const activeSuggestionRef = useRef<HTMLLIElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = LocalityData.filter(
        (suggestion: Suggestion) =>
          suggestion.cityName.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.localityName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      );
      setActiveSuggestionIndex(-1);
    } else {
      setSuggestions([]);
    }
  };
  const [loadingState, setLoadingState] = useState(false);

  const handleSuggestionClick = async (value: Suggestion | string) => {
    setLoadingState(true);
    if (typeof value !== "string") {
      setInputValue(`${value.localityName}, ${value.cityName}`);
      setHeadInputValue(`${value.localityName}, ${value.cityName}`);
      setSuggestions([]);

      try {
        const response = await fetch(
          `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${value.localityId}`,
          {
            headers: {
              "X-Zomato-Api-Key": `${process.env.NEXT_PUBLIC_ZOMATO_KEY}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          setLoadingState(false);
          console.log("Weather data:", data); // You can handle the data as needed
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } else {
      setInputValue(value);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(suggestions);
    if (suggestions.length === 0 || suggestions[0] === "No matches found")
      return;

    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      const selectedSuggestion = suggestions[activeSuggestionIndex];
      handleSuggestionClick(selectedSuggestion);
      setActiveSuggestionIndex(-1);
    }
  };

  useEffect(() => {
    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      setInputValue(
        `${suggestions[activeSuggestionIndex].localityName}, ${suggestions[activeSuggestionIndex].cityName}`
      );
      // Scroll the active suggestion into view
      activeSuggestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSuggestionIndex, suggestions]);

  return (
    <div className="mb-2">
      {loadingState ? (
        <h2>...fetching weather details</h2>
      ) : (
        <div className="autocomplete-wrapper z-40 ">
          <input
            autoFocus
            onKeyDown={handleKeyDown}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            aria-autocomplete="list"
            aria-controls="autocomplete-list"
            placeholder="Weather your locality"
          />
          {suggestions.length > 0 && (
            <ul
              id="autocomplete-list"
              className="suggestions-list max-h-52 overflow-y-auto"
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  ref={
                    index === activeSuggestionIndex ? activeSuggestionRef : null
                  }
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  role="option"
                  className={`${
                    index === activeSuggestionIndex ? "active bg-gray-200" : ""
                  }`}
                >
                  {typeof suggestion === "string"
                    ? suggestion
                    : `${suggestion.localityName}, ${suggestion.cityName}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
