'use client'

import { City, CITIES } from '@/app/types'
import CityButton from '@/app/components/atoms/CityButton'

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {CITIES.map((city) => (
        <CityButton
          key={city.name}
          cityName={city.name}
          isSelected={city.name === selectedCity.name}
          onClick={() => onCityChange(city)}
        />
      ))}
    </div>
  );
}
