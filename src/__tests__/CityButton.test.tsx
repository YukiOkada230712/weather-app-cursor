import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CityButton from '@/app/components/atoms/CityButton'

describe('CityButton', () => {
  it('都市名が表示されること', () => {
    render(<CityButton cityName="東京" isSelected={false} onClick={() => {}} />)
    expect(screen.getByRole('button', { name: '東京' })).toBeInTheDocument()
  })

  it('isSelected が true のとき選択スタイルが適用されること', () => {
    render(<CityButton cityName="東京" isSelected={true} onClick={() => {}} />)
    const button = screen.getByRole('button', { name: '東京' })
    expect(button).toHaveClass('bg-sky-500')
  })

  it('isSelected が false のとき通常スタイルが適用されること', () => {
    render(<CityButton cityName="大阪" isSelected={false} onClick={() => {}} />)
    const button = screen.getByRole('button', { name: '大阪' })
    expect(button).not.toHaveClass('bg-sky-500')
    expect(button).toHaveClass('bg-gray-400/40')
  })

  it('クリックすると onClick が呼ばれること', () => {
    const onClick = vi.fn()
    render(<CityButton cityName="東京" isSelected={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: '東京' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('選択中のボタンをクリックしても onClick が呼ばれること', () => {
    const onClick = vi.fn()
    render(<CityButton cityName="東京" isSelected={true} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: '東京' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
