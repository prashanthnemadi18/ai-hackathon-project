import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Camera, Cloud, BarChart3, Shield, Zap, ArrowRight } from 'lucide-react'
import ProjectVoiceGuide from '../components/ProjectVoiceGuide'

export default function HomePage() {
  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Real-time Detection",
      description: "Capture and analyze crop diseases instantly using your device camera"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Weather Integration",
      description: "Get location-based weather data and disease risk predictions"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reports",
      description: "Generate detailed PDF reports with treatment recommendations"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Advanced CNN model trained on 22,000+ plant disease images"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Accurate",
      description: "Get results in seconds with 85%+ accuracy rate"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Farmer Friendly",
      description: "Simple interface designed for farmers of all technical levels"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-green-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold gradient-text">AgroGuard</span>
              <p className="text-xs text-gray-500">Smart Farming</p>
            </div>
          </motion.div>
          <div className="flex gap-3">
            <Link to="/login" className="px-6 py-2 text-green-600 font-semibold hover:text-green-700 transition">
              Login
            </Link>
            <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition shadow-soft">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-block mb-6 px-4 py-2 bg-green-100/50 rounded-full border border-green-200"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm font-semibold text-green-700">🌾 AI-Powered Agriculture</p>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Protect Your Crops with <span className="gradient-text">Smart AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Detect crop diseases instantly, get weather-based risk analysis, and receive personalized treatment recommendations powered by advanced AI technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition shadow-medium flex items-center gap-2 hover-lift"
            >
              Start Detecting <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition hover-lift">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative h-96 bg-gradient-to-br from-green-400 via-emerald-500 to-blue-500 rounded-3xl overflow-hidden shadow-lg hover-lift"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white text-center"
            >
              <Camera className="w-24 h-24 mx-auto mb-4 opacity-90" />
              <p className="text-2xl font-bold">Scan & Detect</p>
              <p className="text-sm opacity-80 mt-2">Real-time Disease Analysis</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 text-lg">Everything farmers need to protect their crops</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-white rounded-2xl hover:shadow-lg transition border border-gray-100 hover-lift"
                variants={itemVariants}
              >
                <div className="text-green-600 mb-4 p-3 bg-green-100/50 w-fit rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 text-white text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "22K+", label: "Training Images", icon: "📊" },
              { number: "15", label: "Disease Classes", icon: "🦠" },
              { number: "85%", label: "Accuracy", icon: "🎯" },
              { number: "3", label: "Crops Supported", icon: "🌾" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="hover-lift">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-lg hover-lift"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">Ready to Protect Your Crops?</h2>
          <p className="text-green-100 mb-8 text-lg">Join thousands of farmers using AgroGuard AI</p>
          <Link 
            to="/login"
            className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition hover-lift"
          >
            Get Started Now →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 py-12 px-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">AgroGuard AI</h3>
              <p className="text-sm">Smart crop disease detection for modern farmers.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Disease Detection</a></li>
                <li><a href="#" className="hover:text-white">Weather Analysis</a></li>
                <li><a href="#" className="hover:text-white">Treatment Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2024 AgroGuard AI. Built with ❤️ for farmers worldwide.</p>
          </div>
        </div>
      </footer>

      {/* Voice Guide */}
      <ProjectVoiceGuide />
    </div>
  )
}
