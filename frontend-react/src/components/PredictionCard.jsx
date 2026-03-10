import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, AlertTriangle, Zap } from 'lucide-react'

export default function PredictionCard({ prediction }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very High':
        return { gradient: 'from-red-600 to-red-700', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
      case 'High':
        return { gradient: 'from-orange-600 to-orange-700', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
      case 'Moderate':
        return { gradient: 'from-yellow-600 to-yellow-700', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }
      case 'None':
        return { gradient: 'from-green-600 to-green-700', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
      default:
        return { gradient: 'from-gray-600 to-gray-700', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
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

  const severity = getSeverityColor(prediction.severity)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition overflow-hidden border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${severity.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Detection Result</h3>
            <p className="text-white/80 text-sm">AI Analysis Complete</p>
          </div>
          <div className="text-white/90">
            {getSeverityIcon(prediction.severity)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Disease Name */}
        <motion.div
          className={`${severity.bg} rounded-xl p-4 border ${severity.border}`}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-gray-600 mb-1">Disease Detected</p>
          <p className={`text-2xl font-bold ${severity.text}`}>{prediction.disease.replace(/_/g, ' ')}</p>
        </motion.div>

        {/* Confidence and Severity */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs font-semibold text-gray-600 mb-2">Confidence</p>
            <p className="text-2xl font-bold text-blue-600">{prediction.confidence}%</p>
            <div className="mt-2 w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${prediction.confidence}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div
            className={`${severity.bg} rounded-xl p-4 border ${severity.border}`}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs font-semibold text-gray-600 mb-2">Severity</p>
            <p className={`text-2xl font-bold ${severity.text}`}>{prediction.severity}</p>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Description
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{prediction.description}</p>
        </motion.div>

        {/* Symptoms */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs font-semibold text-gray-700 mb-2">Symptoms</p>
          <p className="text-sm text-gray-700 leading-relaxed">{prediction.symptoms}</p>
        </motion.div>

        {/* Treatment */}
        {prediction.treatment && (
          <motion.div
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs font-semibold text-gray-700 mb-3">Treatment Recommendations</p>
            <ul className="space-y-2">
              {prediction.treatment.slice(0, 3).map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="font-bold text-green-600 flex-shrink-0">{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
