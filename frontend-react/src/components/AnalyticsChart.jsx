import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity } from 'lucide-react'

export default function AnalyticsChart() {
  const stats = [
    { label: 'Total Scans', value: '1,234', change: '+12.5%', icon: BarChart3, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Success Rate', value: '99.2%', change: '+0.4%', icon: Activity, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Zones', value: '15', change: '+2', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
  ]

  const recentScans = [
    { disease: 'Tomato Early Blight', confidence: 92, date: 'Mar 10, 2024', status: 'In Treatment' },
    { disease: 'Potato Late Blight', confidence: 88, date: 'Mar 09, 2024', status: 'Resolved' },
    { disease: 'Pepper Bacterial Spot', confidence: 95, date: 'Mar 08, 2024', status: 'In Treatment' },
    { disease: 'Tomato Healthy', confidence: 98, date: 'Mar 07, 2024', status: 'Healthy' },
  ]

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="modern-card bg-white group"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          className="modern-card bg-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-600" />
              Recent Diagnostics
            </h3>
            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All History</button>
          </div>
          <div className="p-8 space-y-4">
            {recentScans.map((scan, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-emerald-200 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 font-black text-xs shadow-sm group-hover:scale-110 transition-transform">
                  {scan.confidence}%
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900">{scan.disease}</h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{scan.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  scan.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {scan.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="modern-card bg-gray-900 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="p-10 relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-4">Productivity Report</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Your farm productivity has increased by <span className="text-emerald-400 font-bold">12.5%</span> since implementing AI-driven disease detection.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Plant Health Index', value: 94 },
                { label: 'Soil Quality Sync', value: 82 },
                { label: 'Resource Efficiency', value: 76 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-emerald-400">{item.value}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20">
              Download Full Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
