import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, LogOut, Cloud, Droplets, Wind, Cloud as CloudRain, Download, BarChart3, Leaf, Mic } from 'lucide-react'
import axios from 'axios'
import jsPDF from 'jspdf'
import WeatherCard from '../components/WeatherCard'
import PredictionCard from '../components/PredictionCard'
import AnalyticsChart from '../components/AnalyticsChart'
import VoiceAssistant from '../components/VoiceAssistant'

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('detect')
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('New Delhi')
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  // Voice location capture
  const captureLocationVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        console.log('Listening for location...')
      }

      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        if (transcript) {
          setCity(transcript.trim())
          // Speak confirmation
          const utterance = new SpeechSynthesisUtterance(`Location set to ${transcript}`)
          window.speechSynthesis.speak(utterance)
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error)
      }

      recognition.start()
    }
  }

  // Auto-detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            // Use reverse geocoding to get city name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            )
            const data = await response.json()
            const cityName = data.address?.city || data.address?.town || 'Unknown'
            setCity(cityName)
          } catch (error) {
            console.log('Could not get city name, using default')
          }
        },
        (error) => {
          console.log('Geolocation not available, using default city')
        }
      )
    }
  }, [])

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
    }
    reader.readAsDataURL(file)

    // Send to backend
    await predictDisease(file)
  }

  // Predict disease
  const predictDisease = async (file) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('city', city)

      // Get API URL from environment or use default
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const endpoint = `${apiUrl}/api/predict`

      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      })

      setPrediction(response.data)
      setWeather(response.data.weather)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error connecting to backend. Please check:\n1. Backend is deployed and running\n2. API URL is correct\n3. CORS is enabled')
    }
    setLoading(false)
  }

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      alert('Camera access denied')
    }
  }

  // Capture from camera
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      canvasRef.current.toBlob((blob) => {
        handleImageUpload(blob)
        stopCamera()
      })
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  // Generate Professional PDF Report
  const generatePDF = () => {
    if (!prediction) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Color scheme
    const primaryColor = [5, 150, 105] // #059669
    const darkColor = [31, 41, 55] // #1f2937
    const lightGray = [249, 250, 251] // #f9fafb

    // Header with background
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, pageWidth, 50, 'F')
    
    // Logo and title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont(undefined, 'bold')
    doc.text('AgroGuard AI', 20, 25)
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.text('Smart Crop Disease Detection Report', 20, 35)
    
    // Report date
    doc.setFontSize(9)
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 20, 25, { align: 'right' })

    yPosition = 60

    // Disease Detection Section
    doc.setTextColor(...darkColor)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Disease Detection Results', 20, yPosition)
    yPosition += 10

    // Background for results
    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 5, pageWidth - 30, 35, 'F')

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    doc.setTextColor(...darkColor)
    
    doc.text(`Disease: ${prediction.disease.replace(/_/g, ' ')}`, 20, yPosition)
    yPosition += 7
    doc.text(`Confidence: ${prediction.confidence}%`, 20, yPosition)
    yPosition += 7
    doc.text(`Severity: ${prediction.severity}`, 20, yPosition)
    yPosition += 7
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition)
    
    yPosition += 15

    // Description Section
    doc.setFont(undefined, 'bold')
    doc.setFontSize(12)
    doc.text('Description', 20, yPosition)
    yPosition += 6

    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    const descLines = doc.splitTextToSize(prediction.description, pageWidth - 40)
    doc.text(descLines, 20, yPosition)
    yPosition += descLines.length * 5 + 5

    // Symptoms Section
    doc.setFont(undefined, 'bold')
    doc.setFontSize(12)
    doc.text('Symptoms', 20, yPosition)
    yPosition += 6

    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    const symptomLines = doc.splitTextToSize(prediction.symptoms, pageWidth - 40)
    doc.text(symptomLines, 20, yPosition)
    yPosition += symptomLines.length * 5 + 8

    // Treatment Section
    doc.setFont(undefined, 'bold')
    doc.setFontSize(12)
    doc.text('Treatment Recommendations', 20, yPosition)
    yPosition += 6

    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    prediction.treatment.forEach((treatment, idx) => {
      const treatmentLines = doc.splitTextToSize(`${idx + 1}. ${treatment}`, pageWidth - 40)
      doc.text(treatmentLines, 20, yPosition)
      yPosition += treatmentLines.length * 5
    })

    yPosition += 5

    // Weather Information Section
    if (weather && weather.city) {
      doc.setFont(undefined, 'bold')
      doc.setFontSize(12)
      doc.text('Weather Information', 20, yPosition)
      yPosition += 6

      // Weather background
      doc.setFillColor(...lightGray)
      doc.rect(15, yPosition - 5, pageWidth - 30, 30, 'F')

      doc.setFont(undefined, 'normal')
      doc.setFontSize(10)
      doc.text(`Location: ${weather.city}`, 20, yPosition)
      yPosition += 6
      doc.text(`Temperature: ${weather.temperature}°C`, 20, yPosition)
      yPosition += 6
      doc.text(`Humidity: ${weather.humidity}%`, 20, yPosition)
      yPosition += 6
      doc.text(`Wind Speed: ${weather.wind_speed} m/s`, 20, yPosition)
      yPosition += 6
      doc.text(`Condition: ${weather.description}`, 20, yPosition)
    }

    yPosition += 15

    // Disease Risk Assessment
    doc.setFont(undefined, 'bold')
    doc.setFontSize(12)
    doc.text('Disease Risk Assessment', 20, yPosition)
    yPosition += 6

    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    
    let riskLevel = 'Low'
    let riskColor = [34, 197, 94] // green
    
    if (weather && weather.humidity > 80) {
      riskLevel = 'High'
      riskColor = [239, 68, 68] // red
    } else if (weather && weather.humidity > 60) {
      riskLevel = 'Medium'
      riskColor = [251, 146, 60] // orange
    }

    doc.setFillColor(...riskColor)
    doc.rect(15, yPosition - 5, pageWidth - 30, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont(undefined, 'bold')
    doc.text(`Risk Level: ${riskLevel}`, 20, yPosition + 2)

    yPosition += 20

    // Footer
    doc.setTextColor(150, 150, 150)
    doc.setFontSize(8)
    doc.text('This report is generated by AgroGuard AI. Please consult with agricultural experts for critical decisions.', 20, pageHeight - 15, { maxWidth: pageWidth - 40 })

    // Save PDF
    doc.save(`AgroGuard_Report_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-white/20 rounded-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AgroGuard AI</h1>
              <p className="text-green-100 text-xs">Smart Crop Disease Detection</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-semibold">{user?.name}</p>
              <p className="text-green-100 text-xs">Farmer Account</p>
            </div>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition font-semibold border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div 
          className="flex gap-4 mb-8 bg-white rounded-xl shadow-soft p-2 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { id: 'detect', label: 'Disease Detection', icon: <Camera className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition flex-1 sm:flex-none ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Detection Tab */}
        {activeTab === 'detect' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Upload Card */}
              <motion.div
                className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition border border-gray-100 overflow-hidden"
                whileHover={{ y: -4 }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Camera className="w-6 h-6" />
                    Upload Crop Image
                  </h2>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Upload Area */}
                  <motion.div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition bg-gradient-to-br from-green-50 to-emerald-50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Upload className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-700 font-semibold mb-2 text-lg">Click to upload or drag and drop</p>
                    <p className="text-gray-600 text-sm">PNG, JPG, JPEG, WEBP (max 16MB)</p>
                  </motion.div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    className="hidden"
                  />

                  {/* Camera Button */}
                  <motion.button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-5 h-5" />
                    Use Camera
                  </motion.button>

                  {/* Camera View */}
                  {cameraActive && (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border-2 border-green-300"
                      />
                      <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                      <div className="flex gap-4">
                        <motion.button
                          onClick={capturePhoto}
                          className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Capture
                        </motion.button>
                        <motion.button
                          onClick={stopCamera}
                          className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Preview */}
                  {image && !cameraActive && (
                    <motion.div
                      className="rounded-lg overflow-hidden border-2 border-green-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <img src={image} alt="Preview" className="w-full" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Location Input */}
              <motion.div className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <h3 className="text-lg font-bold">Location Settings</h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Enter or speak your location</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city name or use voice"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                    <motion.button
                      onClick={() => captureLocationVoice()}
                      className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mic className="w-5 h-5" />
                      Voice
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">📍 Auto-detected from your device location</p>
                </div>
              </motion.div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Prediction Result */}
              {prediction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <PredictionCard prediction={prediction} />
                </motion.div>
              )}

              {/* Weather Card */}
              {weather && weather.city && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <WeatherCard weather={weather} />
                </motion.div>
              )}

              {/* PDF Download */}
              {prediction && (
                <motion.button
                  onClick={generatePDF}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition font-semibold border border-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  Download Report
                </motion.button>
              )}

              {/* Loading */}
              {loading && (
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 text-center border border-blue-200"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-3"
                  >
                    <Camera className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <p className="text-blue-900 font-semibold">Analyzing image...</p>
                  <p className="text-blue-700 text-sm mt-1">Please wait while AI processes your crop image</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnalyticsChart />
          </motion.div>
        )}
      </div>

      {/* Voice Assistant */}
      {prediction && <VoiceAssistant prediction={prediction} weather={weather} />}
    </div>
  )
}
