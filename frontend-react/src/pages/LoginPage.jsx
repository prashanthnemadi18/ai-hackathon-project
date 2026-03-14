import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Leaf, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, TrendingUp, Image, Brain, User } from 'lucide-react'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const leftPanelVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const rightPanelVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
  }

  return (
    <div className="min-h-screen flex bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
      {/* Left Panel - Green Background */}
      <motion.div
        variants={leftPanelVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-[40%] bg-gray-900 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[120px] opacity-10" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-16 text-white justify-between">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">AgroGuard AI</span>
          </motion.div>

          <div className="space-y-8">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl font-black leading-[1.1] tracking-tighter"
            >
              The future of <br />
              <span className="text-emerald-500">agriculture</span> is here.
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm"
            >
              Join 12,000+ farmers using our AI to protect their harvests and increase yield.
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              {[
                { icon: Brain, label: '99.2% AI Accuracy' },
                { icon: TrendingUp, label: 'Sub-second Analysis' },
                { icon: CheckCircle, label: 'Secure Data Sync' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500">
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            © 2024 AgroGuard AI Platform
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        variants={rightPanelVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-[60%] flex items-center justify-center p-8 bg-white"
      >
        <div className="w-full max-w-md">
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter">Sign In</h2>
            <p className="text-gray-400 font-medium">Welcome back! Please enter your details.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Username</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 outline-none transition-all font-bold text-gray-900"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-600/10 focus:border-emerald-600 outline-none transition-all font-bold text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-emerald-600 focus:ring-emerald-600/20 transition-all cursor-pointer" />
                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm font-black text-emerald-600 hover:text-emerald-700 transition-colors">Forgot password?</button>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Platform
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </>
              )}
            </motion.button>

            <motion.p variants={itemVariants} className="text-center text-sm font-bold text-gray-400 mt-8">
              New to AgroGuard? <span className="text-emerald-600 cursor-pointer hover:underline">Create an account</span>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
