import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, CloudRain } from 'lucide-react'

export default function WeatherCard({ weather }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-500" />
    if (desc.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-500" />
    return <Cloud className="w-12 h-12 text-yellow-500" />
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-bold mb-4">Weather Information</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm opacity-90">{weather.city}</p>
          <p className="text-4xl font-bold">{weather.temperature}°C</p>
        </div>
        {getWeatherIcon(weather.description)}
      </div>

      <p className="text-center mb-6 capitalize">{weather.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            <span>Humidity</span>
          </div>
          <span className="font-semibold">{weather.humidity}%</span>
        </div>

        <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            <span>Wind Speed</span>
          </div>
          <span className="font-semibold">{weather.wind_speed} m/s</span>
        </div>
      </div>

      {/* Disease Risk */}
      <div className="mt-6 p-4 bg-white/20 rounded-lg">
        <p className="text-sm font-semibold mb-2">Disease Risk Level:</p>
        <div className="flex gap-2">
          {weather.humidity > 80 && (
            <span className="px-3 py-1 bg-red-500 rounded-full text-xs font-semibold">High Risk</span>
          )}
          {weather.humidity > 60 && weather.humidity <= 80 && (
            <span className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-semibold">Medium Risk</span>
          )}
          {weather.humidity <= 60 && (
            <span className="px-3 py-1 bg-green-500 rounded-full text-xs font-semibold">Low Risk</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
