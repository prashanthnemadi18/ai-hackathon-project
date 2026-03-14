import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Leaf, Brain, Cloud, BarChart, Shield, Zap, CheckCircle2, ArrowRight, X } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleQuickLogin = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    const userData = {
      id: Math.random().toString(36).slice(2, 9),
      username,
      name: username,
      loginTime: new Date().toISOString()
    }
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/dashboard')
  }

  const features = [
    { icon: Brain, title: 'AI Detection', desc: 'Neural network disease identification' },
    { icon: Cloud, title: 'Weather Sync', desc: 'Real-time environmental insights' },
    { icon: BarChart, title: 'Analytics', desc: 'Comprehensive growth tracking' },
    { icon: Shield, title: 'Crop Guard', desc: 'Smart protection protocols' },
    { icon: Zap, title: 'Fast Engine', desc: 'Sub-second image processing' },
    { icon: Leaf, title: 'Eco-Smart', desc: 'Sustainable farming guides' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary/30 selection:text-primary-dark overflow-x-hidden">
      {/* Navigation */}
      <nav className="modern-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-glow">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">AgroGuard AI</span>
          </motion.div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="text-gray-600 font-medium hover:text-primary transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="modern-hero">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-8"
            >
              <div className="modern-ai-badge">
                <div className="modern-ai-indicator" />
                <span className="text-sm uppercase tracking-widest font-bold">AI Powered Intelligence</span>
              </div>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-gray-900 leading-[1.1]">
              Secure Your <span className="text-primary">Crops</span>
              <br />
              <span className="text-gray-400">With AI Precision</span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-12 text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Detect diseases instantly and get scientific treatment recommendations using our state-of-the-art computer vision platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoginModal(true)}
                className="modern-btn-primary px-10 py-4 text-lg"
              >
                Start Free Analysis
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-white hover:border-primary/30 transition-all duration-300 shadow-sm"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-32"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-soft hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: '99.2%', label: 'Analysis Accuracy', icon: CheckCircle2 },
              { number: '50ms', label: 'Processing Speed', icon: Zap },
              { number: '12K+', label: 'Active Farmers', icon: Leaf },
              { number: '24/7', label: 'Monitoring', icon: Shield }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 mb-6 text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-black mb-3 tracking-tighter">{stat.number}</div>
                <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Welcome back</h2>
                  </div>
                  <button 
                    onClick={() => setShowLoginModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleQuickLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{error}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all mt-4"
                  >
                    Sign In to Dashboard
                  </motion.button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-8">
                  Don't have an account? <span className="text-primary font-bold cursor-pointer">Register now</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
