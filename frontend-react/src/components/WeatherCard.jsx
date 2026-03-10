import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, CloudRain, Sun } from 'lucide-react'

export default function WeatherCard({ weather }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />
    if (desc.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />
    if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="w-16 h-16 text-yellow-400" />
    return <Cloud className="w-16 h-16 text-gray-400" />
  }

  const getRiskLevel = () => {
    if (weather.humidity > 80) return { level: 'High Risk', color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-700' }
    if (weather.humidity > 60) return { level: 'Medium Risk', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700' }
    return { level: 'Low Risk', color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-700' }
  }

  const risk = getRiskLevel()

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition overflow-hidden border border-gray-100"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Weather Information</h3>
        <p className="text-blue-100 text-sm">{weather.city}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Temperature and Icon */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold text-gray-900">{weather.temperature}°C</p>
            <p className="text-gray-600 capitalize mt-1">{weather.description}</p>
          </div>
          <div className="text-blue-400">
            {getWeatherIcon(weather.description)}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{weather.humidity}%</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-100"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-cyan-600" />
              <span className="text-sm font-semibold text-gray-700">Wind Speed</span>
            </div>
            <p className="text-2xl font-bold text-cyan-600">{weather.wind_speed} m/s</p>
          </motion.div>
        </div>

        {/* Disease Risk */}
        <motion.div
          className={`${risk.bg} rounded-xl p-4 border-2 border-current ${risk.text}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-semibold mb-2">Disease Risk Level</p>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${risk.color}`}></div>
            <span className="font-bold text-lg">{risk.level}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
