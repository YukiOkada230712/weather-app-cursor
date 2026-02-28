'use client'

import { useState, useEffect } from "react"

interface WeatherData {
    temperature: number;
    windspeed: number;
    weathercode: number;
}

export default function CurrentWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current_weather=true'
        )
            .then(response => response.json())
            .then(data => {
                setWeather(data.current_weather);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div
                className="w-full h-full min-h-[160px] flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #2576e2 0%, #6dd5fa 100%)",
                    color: "#fff"
                }}
            >
                Loading...
            </div>
        );
    }
    if (!weather) {
        return (
            <div
                className="w-full h-full min-h-[160px] flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #2576e2 0%, #6dd5fa 100%)",
                    color: "#fff"
                }}
            >
                No weather data available
            </div>
        );
    }
    return (
        <div
            className="p-6 rounded-xl shadow-md"
            style={{
                background: "linear-gradient(135deg, #2576e2 0%, #6dd5fa 100%)",
                color: "#fff"
            }}
        >
            <h2 className="text-xl font-bold mb-4">東京の現在の天気</h2>
            <p className="text-lg mb-2">{weather.temperature}℃</p>
            <p className="text-lg mb-2">{weather.windspeed}km/h</p>
        </div>
    );
}