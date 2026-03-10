import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'

export default function AnalyticsChart() {
  const stats = [
    { label: 'Total Scans', value: '1,234', change: '+12%', icon: <BarChart3 className="w-6 h-6" /> },
    { label: 'Diseases Detected', value: '45', change: '+8%', icon: <Activity className="w-6 h-6" /> },
    { label: 'Accuracy Rate', value: '85%', change: '+2%', icon: <TrendingUp className="w-6 h-6" /> },
  ]

  const recentScans = [
    { disease: 'Tomato Early Blight', confidence: 92, date: '2024-01-15' },
    { disease: 'Potato Late Blight', confidence: 88, date: '2024-01-14' },
    { disease: 'Pepper Bacterial Spot', confidence: 95, date: '2024-01-13' },
    { disease: 'Tomato Healthy', confidence: 98, date: '2024-01-12' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-green-600">{stat.icon}</div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Scans */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Scans</h2>
        <div className="space-y-4">
          {recentScans.map((scan, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition"
              whileHover={{ x: 5 }}
            >
              <div>
                <p className="font-semibold text-gray-900">{scan.disease}</p>
                <p className="text-sm text-gray-600">{scan.date}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{scan.confidence}%</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${scan.confidence}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disease Distribution */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Disease Distribution</h2>
        <div className="space-y-4">
          {[
            { name: 'Tomato Diseases', count: 45, color: 'from-red-500 to-red-600' },
            { name: 'Potato Diseases', count: 32, color: 'from-yellow-500 to-yellow-600' },
            { name: 'Pepper Diseases', count: 28, color: 'from-orange-500 to-orange-600' },
            { name: 'Healthy Plants', count: 89, color: 'from-green-500 to-green-600' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">{item.name}</span>
                <span className="text-gray-600">{item.count}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / 194) * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
