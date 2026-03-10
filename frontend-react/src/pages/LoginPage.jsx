import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Leaf, Lock, Eye, EyeOff, Camera, Cloud, BarChart3, Zap } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple validation
    if (!username || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      setLoading(false)
      return
    }

    // Simulate login
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).slice(2, 9),
        username,
        name: username,
        loginTime: new Date().toISOString()
      }
      onLogin(userData)
      navigate('/dashboard')
      setLoading(false)
    }, 1000)
  }

  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Real-time Detection",
      description: "Capture and analyze crop diseases instantly"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Weather Integration",
      description: "Location-based weather and disease risk analysis"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reports",
      description: "Generate detailed PDF reports with recommendations"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered",
      description: "85%+ accuracy with advanced CNN model"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="flex h-screen">
        {/* Left Side - Features */}
        <motion.div
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 flex-col justify-between text-white relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="p-3 bg-white/20 rounded-lg backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Leaf className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold">AgroGuard AI</h1>
              <p className="text-green-100 text-sm">Smart Crop Disease Detection</p>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div 
            className="space-y-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex gap-4 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-green-100 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 pt-8 border-t border-white/20 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { number: "22K+", label: "Training Images" },
              { number: "85%", label: "Accuracy" },
              { number: "15", label: "Disease Classes" },
              { number: "3", label: "Crops Supported" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-bold">{stat.number}</p>
                <p className="text-green-100 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-md">
            {/* Card */}
            <motion.div 
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h2>
                <p className="text-gray-600">Login to your AgroGuard account</p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <Leaf className="absolute left-4 top-3.5 w-5 h-5 text-green-600" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="Enter your username"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-green-600" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                      placeholder="Enter your password"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                      whileHover={{ scale: 1.1 }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-semibold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Logging in...
                    </motion.span>
                  ) : (
                    'Login'
                  )}
                </motion.button>
              </form>

              {/* Demo Credentials */}
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-blue-900 font-semibold mb-2">📝 Demo Credentials:</p>
                <p className="text-sm text-blue-800">Username: <span className="font-mono font-bold">farmer</span></p>
                <p className="text-sm text-blue-800">Password: <span className="font-mono font-bold">demo123</span></p>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="mt-6 text-center text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p>
                  <Link to="/" className="text-green-600 font-semibold hover:text-green-700 transition">
                    ← Back to Home
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
