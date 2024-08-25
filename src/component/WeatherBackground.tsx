import React from "react";

interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  wind_direction: number | null;
  rain_intensity: number | null;
  rain_accumulation: number | null;
}

interface WeatherBackgroundProps {
  data: WeatherData;
  children: React.ReactNode;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
  data,
  children,
}) => {
  const { temperature, humidity, wind_speed, wind_direction, rain_intensity } =
    data;

  const generateWeatherSummary = (data: WeatherData): string => {
    const summaryParts: string[] = [];

    if (temperature !== null) {
      if (temperature < 0) summaryParts.push("It's freezing cold");
      else if (temperature < 10) summaryParts.push("It's quite cold");
      else if (temperature < 20) summaryParts.push("It's cool");
      else if (temperature < 30) summaryParts.push("It's warm");
      else summaryParts.push("It's hot");
    }

    if (humidity !== null) {
      if (humidity < 30) summaryParts.push("and very dry");
      else if (humidity > 70) summaryParts.push("and humid");
    }

    if (wind_speed !== null) {
      if (wind_speed < 5) summaryParts.push("with light winds");
      else if (wind_speed < 15) summaryParts.push("with moderate winds");
      else summaryParts.push("with strong winds");
    }

    if (wind_direction !== null) {
      const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      const index = Math.round(wind_direction / 45) % 8;
      summaryParts.push(`from the ${directions[index]}`);
    }

    if (rain_intensity !== null) {
      if (rain_intensity === 0) summaryParts.push("and no rain");
      else if (rain_intensity < 2.5) summaryParts.push("with light rain");
      else if (rain_intensity < 7.6) summaryParts.push("with moderate rain");
      else summaryParts.push("with heavy rain");
    }

    return summaryParts.length > 0
      ? summaryParts.join(" ") + "."
      : "Weather data is currently unavailable.";
  };
  const weatherSummary = generateWeatherSummary(data);

  const getTemperatureGradient = () => {
    if (temperature === null) return "bg-gray-300";
    if (temperature < 0) return "bg-gradient-to-t from-blue-900 to-blue-500";
    if (temperature >= 0 && temperature <= 20)
      return "bg-gradient-to-t from-green-700 to-green-300";
    if (temperature > 20 && temperature <= 30)
      return "bg-gradient-to-t from-yellow-400 to-yellow-200";
    return "bg-gradient-to-t from-orange-500 to-red-500";
  };

  const getRainEffect = () => {
    if (rain_intensity === null || rain_intensity === 0) return "";
    if (rain_intensity > 0 && rain_intensity <= 2.5) return "after:opacity-20";
    if (rain_intensity > 2.5 && rain_intensity <= 7.6)
      return "after:opacity-50";
    return "after:opacity-80";
  };

  const getWindSpeed = () => {
    if (wind_speed === null || wind_speed < 1) return "animate-none";
    if (wind_speed >= 1 && wind_speed <= 5) return "animate-wind-light";
    if (wind_speed >= 6 && wind_speed <= 11) return "animate-wind-gentle";
    if (wind_speed >= 12 && wind_speed <= 19) return "animate-wind-moderate";
    if (wind_speed >= 20 && wind_speed <= 30) return "animate-wind-fresh";
    return "animate-wind-strong";
  };

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center relative overflow-auto transition-all duration-500 ${getTemperatureGradient()}`}
    >
      {/* Background (lowest layer) */}
      <div className="absolute inset-0 z-0 min-h-screen overflow-hidden">
        {/* Wind Effect (second layer) */}
        <div
          className={`absolute inset-0 bg-repeat ${getWindSpeed()} `}
          style={{
            backgroundImage: `url("/wind_img.png")`,
            transform: `rotate(${wind_direction ?? 0}deg)`,
            transformOrigin: "center",
            width: "150%",
            height: "150%",
            left: "-25%",
            top: "-25%",
          }}
        />
      </div>

      {/* Rain Effect (third layer) */}
      {/* ``<div
          className={`absolute inset-0 pointer-events-none ${getRainEffect()} after:content-[''] after:absolute after:inset-0 after:bg-[url('/path-to-rain-animation.gif')] after:bg-repeat-x after:bg-top z-20`}
        />`` */}

      {/* Children (fourth layer) */}
      <div className=" z-30  absolute top-[20%] p-3 m-auto">
        {children}

        {/* Bento Grid (top layer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-white bg-opacity-80 rounded-lg overflow-y-auto max-w-4xl w-full z-40">
          <BentoItem
            title="Temperature"
            value={
              temperature !== null ? `${temperature.toFixed(2)}°C` : "No data"
            }
          />
          <BentoItem
            title="Humidity"
            value={humidity !== null ? `${humidity.toFixed(2)}%` : "No data"}
          />
          <BentoItem
            title="Wind Speed"
            value={
              wind_speed !== null ? `${wind_speed.toFixed(2)} Km/h` : "No data"
            }
          />
          <BentoItem
            title="Wind Direction"
            value={
              wind_direction !== null
                ? `${wind_direction.toFixed(2)}°`
                : "No data"
            }
          />
          <BentoItem
            title="Rain Intensity"
            value={
              rain_intensity !== null
                ? `${rain_intensity.toFixed(2)} mm/min`
                : "No data"
            }
          />
          <BentoItem
            title="Rain Accumulation"
            value={
              data.rain_accumulation !== null
                ? `${data.rain_accumulation.toFixed(2)} mm`
                : "No data"
            }
          />
          <div className="col-span-full">
            <BentoItem title="Summary" value={weatherSummary} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="text-center bg-white p-5 rounded-lg shadow-md">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p>{value}</p>
  </div>
);

export default WeatherBackground;
