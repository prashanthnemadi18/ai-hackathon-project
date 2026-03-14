import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, AlertTriangle, Shield, Activity, Cloud, Sun, CloudRain } from 'lucide-react'

export default function PredictionCard({ prediction, weather }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very High':
        return { gradient: 'from-red-600 to-red-700', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' }
      case 'High':
        return { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' }
      case 'Moderate':
        return { gradient: 'from-amber-400 to-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' }
      case 'None':
      case 'Healthy':
        return { gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' }
      default:
        return { gradient: 'from-slate-500 to-slate-600', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100' }
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Very High':
      case 'High':
        return <AlertTriangle className="w-6 h-6" />
      case 'None':
        return <CheckCircle className="w-6 h-6" />
      default:
        return <AlertCircle className="w-6 h-6" />
    }
  }

  const getWeatherCondition = () => {
    if (!weather) return { condition: 'Unknown', icon: Cloud, color: 'text-gray-500', bg: 'bg-gray-100' }
    
    const description = weather.description?.toLowerCase() || ''
    const temp = weather.temperature || 0
    const humidity = weather.humidity || 0
    
    // Determine weather condition based on description and metrics
    if (description.includes('rain') || description.includes('shower') || humidity > 80) {
      return { 
        condition: 'Rainy Season', 
        icon: CloudRain, 
        color: 'text-blue-600', 
        bg: 'bg-blue-50',
        advice: 'High humidity promotes fungal growth. Apply fungicides preventively.'
      }
    } else if (temp > 35) {
      return { 
        condition: 'Hot & Dry', 
        icon: Sun, 
        color: 'text-orange-600', 
        bg: 'bg-orange-50',
        advice: 'Heat stress detected. Increase irrigation and provide shade if possible.'
      }
    } else if (description.includes('cloud') || humidity > 60) {
      return { 
        condition: 'Humid', 
        icon: Cloud, 
        color: 'text-gray-600', 
        bg: 'bg-gray-100',
        advice: 'Moderate humidity. Monitor for disease development.'
      }
    } else {
      return { 
        condition: 'Normal', 
        icon: Sun, 
        color: 'text-green-600', 
        bg: 'bg-green-50',
        advice: 'Optimal conditions for treatment application.'
      }
    }
  }

  const getWeatherBasedTreatment = (baseTreatment, weatherCondition) => {
    if (!weatherCondition) return baseTreatment
    
    const weatherAdvice = weatherCondition.advice
    return [...baseTreatment, weatherAdvice]
  }

  const severity = getSeverityColor(prediction.severity)
  const weatherCondition = getWeatherCondition()
  const WeatherIcon = weatherCondition.icon
  const enhancedTreatment = getWeatherBasedTreatment(prediction.treatment || [], weatherCondition)

  return (
    <motion.div
      className="modern-card relative overflow-hidden bg-white group"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Banner */}
      <div className={`relative bg-gradient-to-r ${severity.gradient} p-8 text-white`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
              Confidence Score: {prediction.confidence}%
            </div>
          </div>
          
          <h3 className="text-3xl font-black tracking-tight mb-2">{prediction.disease}</h3>
          <p className="text-white/80 font-medium text-sm">Diagnosis result based on AI scan</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border ${severity.border} ${severity.bg} flex items-center gap-4`}>
            <div className={`p-2 rounded-xl bg-white shadow-sm ${severity.text}`}>
              {getSeverityIcon(prediction.severity)}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Severity</p>
              <p className={`font-black ${severity.text}`}>{prediction.severity}</p>
            </div>
          </div>
          <div className={`p-4 rounded-2xl border ${weatherCondition.bg.replace('bg-', 'border-')} ${weatherCondition.bg} flex items-center gap-4`}>
            <div className={`p-2 rounded-xl bg-white shadow-sm ${weatherCondition.color}`}>
              <WeatherIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Climate</p>
              <p className={`font-black ${weatherCondition.color}`}>{weatherCondition.condition}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            Description
          </h4>
          <p className="text-gray-500 text-sm leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100">
            {prediction.description}
          </p>
        </div>

        {/* Treatment Steps */}
        <div>
          <h4 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Treatment Protocol
          </h4>
          <div className="space-y-3">
            {enhancedTreatment.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors group/item"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                  {idx + 1}
                </div>
                <p className="text-xs text-gray-600 font-bold group-hover/item:text-emerald-700 transition-colors">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
