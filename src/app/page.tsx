"use client";
import SearchBox from "@/component/SearchBox";
import WeatherBackground from "@/component/WeatherBackground";
import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [headInputValue, setHeadInputValue] = useState<string>("");

  return (
    <main className=" min-h-screen overflow-y-auto ">
      <div className="h-[10vh] p-2 flex items-center w-full  justify-between rounded-b-sm bg-slate-  z-10 absolute font-bold">
        <div>
          <h1 className="font-bold text-2xl m-2 text-black-600 z-20 ">
            Know Your Locality Weather
          </h1>
        </div>
        {/* <div className="h-[20px] w-[20px] rounded-full border border-black text-center p-0 cursor-pointer flex items-center justify-center font-bold">+</div> */}
      </div>

      {weatherData ? (
        <WeatherBackground data={weatherData.locality_weather_data}>
          <SearchBox
            setWeatherData={setWeatherData}
            weatherData={weatherData}
            headInputValue={headInputValue}
            setHeadInputValue={setHeadInputValue}
          />
        </WeatherBackground>
      ) : (
        <div className=" flex items-center min-h-screen justify-center">
          <SearchBox
            headInputValue={headInputValue}
            setHeadInputValue={setHeadInputValue}
            setWeatherData={setWeatherData}
            weatherData={weatherData}
          />
        </div>
      )}
    </main>
  );
}
