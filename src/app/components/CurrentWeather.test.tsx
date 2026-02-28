import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import CurrentWeather from './CurrentWeather'
import { CITIES } from '@/app/types'

const mockWeatherData = {
  temperature: 22.5,
  windspeed: 15.3,
  weathercode: 1,
}

function createFetchMock(data: object) {
  return vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ current_weather: data }),
  })
}

describe('CurrentWeather', () => {
  beforeEach(() => {
    global.fetch = createFetchMock(mockWeatherData)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('タイトル「天気ダッシュボード」が表示されること', async () => {
    render(<CurrentWeather />)
    expect(screen.getByText('天気ダッシュボード')).toBeInTheDocument()
  })

  it('初期レンダリング時にローディングスピナーが表示されること', () => {
    render(<CurrentWeather />)
    expect(screen.getByText(/天気を取得中/)).toBeInTheDocument()
  })

  it('データ取得後に気温と風速が表示されること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('22.5℃')).toBeInTheDocument()
    })
    expect(screen.getByText('15.3')).toBeInTheDocument()
  })

  it('データ取得後にローディング表示が消えること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.queryByText(/天気を取得中/)).not.toBeInTheDocument()
    })
  })

  it('初期都市は東京であること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('東京の現在の天気')).toBeInTheDocument()
    })
  })

  it('都市を変更すると新しい都市の天気が表示されること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('東京の現在の天気')).toBeInTheDocument()
    })

    const osakaButton = screen.getByRole('button', { name: '大阪' })
    fireEvent.click(osakaButton)

    await waitFor(() => {
      expect(screen.getByText('大阪の現在の天気')).toBeInTheDocument()
    })
  })

  it('都市を変更するとAPIが新しい座標で呼ばれること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('東京の現在の天気')).toBeInTheDocument()
    })

    const osakaButton = screen.getByRole('button', { name: '大阪' })
    fireEvent.click(osakaButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    const secondCall = vi.mocked(global.fetch).mock.calls[1][0] as string
    expect(secondCall).toContain(`latitude=${CITIES[1].latitude}`)
    expect(secondCall).toContain(`longitude=${CITIES[1].longitude}`)
  })

  it('APIエラー時にエラーメッセージが表示されること', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ current_weather: null }),
    })
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('天気データを取得できませんでした')).toBeInTheDocument()
    })
  })

  it('都市セレクターが表示されること', () => {
    render(<CurrentWeather />)
    CITIES.forEach((city) => {
      expect(screen.getByRole('button', { name: city.name })).toBeInTheDocument()
    })
  })

  it('気温ラベルが表示されること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('気温')).toBeInTheDocument()
    })
  })

  it('風速ラベルが表示されること', async () => {
    render(<CurrentWeather />)
    await waitFor(() => {
      expect(screen.getByText('風速')).toBeInTheDocument()
    })
  })
})
