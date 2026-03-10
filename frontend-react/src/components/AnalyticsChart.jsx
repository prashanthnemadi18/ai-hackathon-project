import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, Leaf } from 'lucide-react'

export default function AnalyticsChart() {
  const stats = [
    { label: 'Total Scans', value: '1,234', change: '+12%', icon: <BarChart3 className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Diseases Detected', value: '45', change: '+8%', icon: <Activity className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    { label: 'Accuracy Rate', value: '85%', change: '+2%', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
  ]

  const recentScans = [
    { disease: 'Tomato Early Blight', confidence: 92, date: '2024-01-15' },
    { disease: 'Potato Late Blight', confidence: 88, date: '2024-01-14' },
    { disease: 'Pepper Bacterial Spot', confidence: 95, date: '2024-01-13' },
    { disease: 'Tomato Healthy', confidence: 98, date: '2024-01-12' },
  ]

  const diseaseDistribution = [
    { name: 'Tomato Diseases', count: 45, color: 'from-red-500 to-red-600' },
    { name: 'Potato Diseases', count: 32, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Pepper Diseases', count: 28, color: 'from-orange-500 to-orange-600' },
    { name: 'Healthy Plants', count: 89, color: 'from-green-500 to-green-600' },
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
            className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition overflow-hidden border border-gray-100"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${stat.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm font-semibold">{stat.label}</span>
                <div className="text-white/90">{stat.icon}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">vs last month</p>
                </div>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">{stat.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Scans */}
      <motion.div
        className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            Recent Scans
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {recentScans.map((scan, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:border-green-300 transition"
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{scan.disease}</p>
                <p className="text-sm text-gray-600 mt-1">{scan.date}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 mb-2">{scan.confidence}%</div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${scan.confidence}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disease Distribution */}
      <motion.div
        className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Disease Distribution
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {diseaseDistribution.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">{item.name}</span>
                <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{item.count}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / 194) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
