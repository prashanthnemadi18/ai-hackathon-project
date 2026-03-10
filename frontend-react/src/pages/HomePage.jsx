import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Camera, Cloud, BarChart3, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Real-time Detection",
      description: "Capture and analyze crop diseases instantly using your device camera"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Integration",
      description: "Get location-based weather data and disease risk predictions"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reports",
      description: "Generate detailed PDF reports with treatment recommendations"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Advanced CNN model trained on 22,000+ plant disease images"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Accurate",
      description: "Get results in seconds with 85%+ accuracy rate"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">AgroGuard AI</span>
          </motion.div>
          <div className="flex gap-4">
            <Link to="/login" className="px-6 py-2 text-green-600 font-semibold hover:text-green-700">
              Login
            </Link>
            <Link to="/login" className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
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
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Smart Crop Disease <span className="text-green-600">Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect your crops with AI-powered disease detection. Get instant diagnosis, weather-based risk analysis, and treatment recommendations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/login"
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
            >
              Start Detecting
            </Link>
            <button className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl overflow-hidden shadow-2xl"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white text-center"
            >
              <Camera className="w-24 h-24 mx-auto mb-4 opacity-80" />
              <p className="text-2xl font-semibold">Scan & Detect</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-600 text-lg">Everything you need to protect your crops</p>
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
                className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl hover:shadow-lg transition"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 text-white text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "22K+", label: "Training Images" },
              { number: "15", label: "Disease Classes" },
              { number: "85%", label: "Accuracy" },
              { number: "3", label: "Crops Supported" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Protect Your Crops?</h2>
          <p className="text-green-100 mb-8 text-lg">Join thousands of farmers using AgroGuard AI</p>
          <Link 
            to="/login"
            className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 AgroGuard AI. Built with ❤️ for farmers.</p>
        </div>
      </footer>
    </div>
  )
}
