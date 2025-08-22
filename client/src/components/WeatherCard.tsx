import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/apiUtils";

interface WeatherCardProps {
  city: string;
}

interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
  cod: number;
  message?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const cleanCity = cityName.split(",")[0].trim();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${API_KEY}&units=metric`;
      
      // Using our standardized API utility
      const data = await apiGet<WeatherResponse>(url, {
        showErrorToast: false, // We'll handle the error display ourselves
        timeout: 8000,
      });
      
      if (data.main) {
        setWeather(`${data.main.temp}°C, ${data.weather[0].main}`);
      } else {
        setWeather("N/A");
      }
    } catch (err) {
      // Store error for UI display
      setError(err as Error);
      setWeather("N/A");
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.error("Weather fetch error:", err);
      }
      
      // Don't show toast for weather errors as they're not critical
      // handleError(err, "Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!city) return;
    fetchWeather(city);
  }, [city]);

  const handleRetry = () => {
    if (!city) return;
    fetchWeather(city);
  };

  return (
    <div 
      className="weather-text weather-responsive"
      role="status"
      aria-live="polite"
      aria-label={loading 
        ? `Loading weather information for ${city}`
        : `Current weather in ${city}: ${weather}`
      }
      style={{
        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}
    >
      {error ? (
        <div className="d-flex align-items-center">
          <span aria-hidden="true" className="me-2">⚠️</span>
          <span>Weather data unavailable</span>
          <button 
            onClick={handleRetry} 
            className="btn btn-sm btn-link p-0 ms-2"
            aria-label="Retry fetching weather data"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <span aria-hidden="true">🌤️</span>{" "}
          {loading ? (
            <>
              <span className="sr-only">Loading weather information for {city}</span>
              <span className="text-secondary">Loading weather...</span>
            </>
          ) : (
            <>
              <span className="sr-only">Current weather in {city}: </span>
              {weather}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherCard;
