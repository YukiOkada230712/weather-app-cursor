import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CitySelector from './CitySelector'
import { CITIES } from '@/app/types'

describe('CitySelector', () => {
  const defaultCity = CITIES[0]

  it('すべての都市ボタンが表示されること', () => {
    render(<CitySelector selectedCity={defaultCity} onCityChange={() => {}} />)
    CITIES.forEach((city) => {
      expect(screen.getByRole('button', { name: city.name })).toBeInTheDocument()
    })
  })

  it('選択中の都市ボタンが強調表示されること', () => {
    render(<CitySelector selectedCity={defaultCity} onCityChange={() => {}} />)
    const selectedButton = screen.getByRole('button', { name: defaultCity.name })
    expect(selectedButton).toHaveClass('bg-sky-500')
  })

  it('選択されていない都市ボタンが通常スタイルであること', () => {
    render(<CitySelector selectedCity={defaultCity} onCityChange={() => {}} />)
    const nonSelectedCity = CITIES[1]
    const nonSelectedButton = screen.getByRole('button', { name: nonSelectedCity.name })
    expect(nonSelectedButton).not.toHaveClass('bg-sky-500')
    expect(nonSelectedButton).toHaveClass('bg-gray-400/40')
  })

  it('都市ボタンをクリックすると onCityChange が呼ばれること', () => {
    const onCityChange = vi.fn()
    render(<CitySelector selectedCity={defaultCity} onCityChange={onCityChange} />)
    const osakaButton = screen.getByRole('button', { name: '大阪' })
    fireEvent.click(osakaButton)
    expect(onCityChange).toHaveBeenCalledTimes(1)
    expect(onCityChange).toHaveBeenCalledWith(CITIES[1])
  })

  it('選択中の都市ボタンをクリックしても onCityChange が呼ばれること', () => {
    const onCityChange = vi.fn()
    render(<CitySelector selectedCity={defaultCity} onCityChange={onCityChange} />)
    const tokyoButton = screen.getByRole('button', { name: '東京' })
    fireEvent.click(tokyoButton)
    expect(onCityChange).toHaveBeenCalledTimes(1)
    expect(onCityChange).toHaveBeenCalledWith(CITIES[0])
  })

  it('別の都市を選択時に選択状態が切り替わること', () => {
    const { rerender } = render(
      <CitySelector selectedCity={CITIES[0]} onCityChange={() => {}} />
    )
    expect(screen.getByRole('button', { name: '東京' })).toHaveClass('bg-sky-500')
    expect(screen.getByRole('button', { name: '大阪' })).not.toHaveClass('bg-sky-500')

    rerender(<CitySelector selectedCity={CITIES[1]} onCityChange={() => {}} />)
    expect(screen.getByRole('button', { name: '東京' })).not.toHaveClass('bg-sky-500')
    expect(screen.getByRole('button', { name: '大阪' })).toHaveClass('bg-sky-500')
  })

  it('ボタンの数が CITIES の数と一致すること', () => {
    render(<CitySelector selectedCity={defaultCity} onCityChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(CITIES.length)
  })
})
