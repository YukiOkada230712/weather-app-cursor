'use client'

import { City, CITIES } from '@/app/types'

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {CITIES.map((city) => {
        const isSelected = city.name === selectedCity.name;
        return (
          <button
            key={city.name}
            onClick={() => onCityChange(city)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-1
              ${isSelected
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-700/50 scale-105 border border-sky-300'
                : 'bg-gray-400/40 text-white/80 border border-white/20 hover:bg-gray-300/50 hover:text-white hover:scale-105'
              }
            `}
          >
            {city.name}
          </button>
        );
      })}
    </div>
  );
}
