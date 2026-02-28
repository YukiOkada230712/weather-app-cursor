import { describe, it, expect } from 'vitest'
import { CITIES, type City, type WeatherData } from './types'

describe('CITIES', () => {
  it('5つの都市が定義されていること', () => {
    expect(CITIES).toHaveLength(5)
  })

  it('すべての都市が name, latitude, longitude を持つこと', () => {
    CITIES.forEach((city: City) => {
      expect(city).toHaveProperty('name')
      expect(city).toHaveProperty('latitude')
      expect(city).toHaveProperty('longitude')
      expect(typeof city.name).toBe('string')
      expect(typeof city.latitude).toBe('number')
      expect(typeof city.longitude).toBe('number')
    })
  })

  it('東京が含まれていること', () => {
    const tokyo = CITIES.find((c) => c.name === '東京')
    expect(tokyo).toBeDefined()
    expect(tokyo?.latitude).toBeCloseTo(35.6762, 3)
    expect(tokyo?.longitude).toBeCloseTo(139.6503, 3)
  })

  it('大阪が含まれていること', () => {
    const osaka = CITIES.find((c) => c.name === '大阪')
    expect(osaka).toBeDefined()
  })

  it('札幌が含まれていること', () => {
    const sapporo = CITIES.find((c) => c.name === '札幌')
    expect(sapporo).toBeDefined()
  })

  it('福岡が含まれていること', () => {
    const fukuoka = CITIES.find((c) => c.name === '福岡')
    expect(fukuoka).toBeDefined()
  })

  it('那覇が含まれていること', () => {
    const naha = CITIES.find((c) => c.name === '那覇')
    expect(naha).toBeDefined()
  })

  it('都市の座標が有効な緯度・経度の範囲内にあること', () => {
    CITIES.forEach((city: City) => {
      expect(city.latitude).toBeGreaterThanOrEqual(-90)
      expect(city.latitude).toBeLessThanOrEqual(90)
      expect(city.longitude).toBeGreaterThanOrEqual(-180)
      expect(city.longitude).toBeLessThanOrEqual(180)
    })
  })

  it('すべての都市名がユニークであること', () => {
    const names = CITIES.map((c) => c.name)
    const uniqueNames = new Set(names)
    expect(uniqueNames.size).toBe(names.length)
  })
})

describe('WeatherData 型の検証', () => {
  it('WeatherData オブジェクトが正しい型を持つこと', () => {
    const weatherData: WeatherData = {
      temperature: 20.5,
      windspeed: 10.2,
      weathercode: 0,
    }
    expect(typeof weatherData.temperature).toBe('number')
    expect(typeof weatherData.windspeed).toBe('number')
    expect(typeof weatherData.weathercode).toBe('number')
  })
})
