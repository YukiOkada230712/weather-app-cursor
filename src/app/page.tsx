import CurrentWeather from '@/app/components/CurrentWeather'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CurrentWeather />
    </main>
  )
}