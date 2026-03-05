import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CityButton from '@/app/components/atoms/CityButton'
import CitySelector from '@/app/components/CitySelector'
import { CITIES } from '@/app/types'

const kyoto = CITIES.find((c) => c.name === '京都')!

describe('京都', () => {
  it('CITIES に京都が含まれること', () => {
    expect(kyoto).toBeDefined()
    expect(kyoto.latitude).toBe(35.0116)
    expect(kyoto.longitude).toBe(135.7681)
  })

  it('CityButton で京都が表示されること', () => {
    render(<CityButton cityName="京都" isSelected={false} onClick={() => {}} />)
    expect(screen.getByRole('button', { name: '京都' })).toBeInTheDocument()
  })

  it('CitySelector に京都ボタンが表示されること', () => {
    render(<CitySelector selectedCity={CITIES[0]} onCityChange={() => {}} />)
    expect(screen.getByRole('button', { name: '京都' })).toBeInTheDocument()
  })

  it('京都ボタンを選択すると onCityChange が京都で呼ばれること', () => {
    const onCityChange = vi.fn()
    render(<CitySelector selectedCity={CITIES[0]} onCityChange={onCityChange} />)
    fireEvent.click(screen.getByRole('button', { name: '京都' }))
    expect(onCityChange).toHaveBeenCalledWith(kyoto)
  })

  it('京都が選択中のとき選択スタイルが適用されること', () => {
    render(<CitySelector selectedCity={kyoto} onCityChange={() => {}} />)
    expect(screen.getByRole('button', { name: '京都' })).toHaveClass('bg-sky-500')
  })
})
