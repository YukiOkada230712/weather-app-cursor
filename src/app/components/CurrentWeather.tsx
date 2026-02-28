'use client'

import { useState, useEffect } from "react"
import { City, WeatherData, CITIES } from '@/app/types'
import CitySelector from '@/app/components/CitySelector'

export default function CurrentWeather() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setWeather(null);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current_weather=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      });
  }, [selectedCity]);

  return (
    <div
      className="w-full max-w-md p-6 rounded-2xl shadow-xl"
      style={{
        background: "linear-gradient(135deg, #2576e2 0%, #6dd5fa 100%)",
        color: "#fff",
      }}
    >
      <h1 className="text-2xl font-bold text-center mb-4 tracking-wide">
        天気ダッシュボード
      </h1>

      <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />

      {loading ? (
        <div className="min-h-[120px] flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white/80 text-sm">{selectedCity.name}の天気を取得中...</p>
        </div>
      ) : !weather ? (
        <div className="min-h-[120px] flex items-center justify-center">
          <p className="text-white/80">天気データを取得できませんでした</p>
        </div>
      ) : (
        <div className="bg-white/20 rounded-xl p-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            {selectedCity.name}の現在の天気
          </h2>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">気温</p>
              <p className="text-3xl font-bold">{weather.temperature}℃</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-xs mb-1">風速</p>
              <p className="text-3xl font-bold">{weather.windspeed}<span className="text-lg ml-1">km/h</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
