import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, CloudRain, Sun, AlertTriangle, Shield } from 'lucide-react'

export default function WeatherCard({ weather }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />
    if (desc.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />
    if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="w-16 h-16 text-yellow-400" />
    return <Cloud className="w-16 h-16 text-gray-400" />
  }

  const getRiskLevel = () => {
    if (weather.humidity > 80) return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' }
    if (weather.humidity > 60) return { level: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' }
    return { level: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' }
  }

  const risk = getRiskLevel()

  return (
    <motion.div
      className="modern-card bg-white group"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/30 transition-all duration-700" />
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Environment Sync</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight">{weather.city || 'Local Farm'}</h3>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black tracking-tighter">{weather.temperature}°</div>
            <p className="text-xs font-bold text-gray-400 uppercase mt-1 capitalize">{weather.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group/stat hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover/stat:scale-110 transition-transform">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Humidity</p>
            <p className="text-2xl font-black text-gray-900">{weather.humidity}%</p>
          </div>
          <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group/stat hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover/stat:scale-110 transition-transform">
              <Wind className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Condition</p>
            <div className={`text-xs font-black px-3 py-1 rounded-full ${risk.bg} ${risk.color} mt-2`}>
              {risk.level}
            </div>
          </div>
        </div>

        {/* Advice Box */}
        <div className={`p-6 rounded-[2.5rem] border ${risk.border} ${risk.bg} relative overflow-hidden`}>
          <div className="relative z-10 flex gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 ${risk.color}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-black mb-1 ${risk.color}`}>Agricultural Insight</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {weather.humidity > 70 
                  ? 'High moisture levels detected. Watch for fungal development in the next 48 hours.' 
                  : 'Stable conditions. Optimal window for applying preventive treatments and fertilizers.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
