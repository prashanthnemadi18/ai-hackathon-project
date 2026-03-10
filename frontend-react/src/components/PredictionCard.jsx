import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function PredictionCard({ prediction }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very High':
        return 'from-red-600 to-red-700'
      case 'High':
        return 'from-orange-600 to-orange-700'
      case 'Moderate':
        return 'from-yellow-600 to-yellow-700'
      case 'None':
        return 'from-green-600 to-green-700'
      default:
        return 'from-gray-600 to-gray-700'
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

  return (
    <motion.div
      className={`bg-gradient-to-br ${getSeverityColor(prediction.severity)} rounded-2xl shadow-lg p-6 text-white`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold">Detection Result</h3>
        {getSeverityIcon(prediction.severity)}
      </div>

      <div className="mb-6">
        <p className="text-sm opacity-90 mb-1">Disease Detected</p>
        <p className="text-2xl font-bold">{prediction.disease.replace(/_/g, ' ')}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
          <span>Confidence</span>
          <span className="font-bold text-lg">{prediction.confidence}%</span>
        </div>

        <div className="flex justify-between items-center bg-white/20 rounded-lg p-3">
          <span>Severity</span>
          <span className="font-bold">{prediction.severity}</span>
        </div>
      </div>

      <div className="bg-white/20 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold mb-2">Description:</p>
        <p className="text-sm opacity-90">{prediction.description}</p>
      </div>

      <div className="bg-white/20 rounded-lg p-4">
        <p className="text-sm font-semibold mb-2">Symptoms:</p>
        <p className="text-sm opacity-90">{prediction.symptoms}</p>
      </div>

      {prediction.treatment && (
        <div className="mt-4 bg-white/20 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">Treatment:</p>
          <ul className="text-sm opacity-90 space-y-1">
            {prediction.treatment.slice(0, 3).map((t, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
