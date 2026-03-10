import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Upload, LogOut, Cloud, Droplets, Wind, Cloud as CloudRain, Download, BarChart3, Leaf } from 'lucide-react'
import axios from 'axios'
import jsPDF from 'jspdf'
import WeatherCard from '../components/WeatherCard'
import PredictionCard from '../components/PredictionCard'
import AnalyticsChart from '../components/AnalyticsChart'

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

      // Try both localhost and direct IP
      const endpoints = [
        'http://localhost:5000/api/predict',
        'http://127.0.0.1:5000/api/predict'
      ]

      let response = null
      for (const endpoint of endpoints) {
        try {
          response = await axios.post(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 10000
          })
          break
        } catch (error) {
          continue
        }
      }

      if (!response) {
        throw new Error('Backend not responding')
      }

      setPrediction(response.data)
      setWeather(response.data.weather)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error: Make sure backend is running on port 5000\nRun: python app.py in backend folder')
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

  // Generate PDF report
  const generatePDF = () => {
    if (!prediction) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Header
    doc.setFillColor(16, 185, 129)
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('AgroGuard AI Report', pageWidth / 2, 25, { align: 'center' })

    // Reset text color
    doc.setTextColor(0, 0, 0)
    yPosition = 50

    // Disease Information
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Disease Detection Results', 20, yPosition)
    yPosition += 10

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    doc.text(`Disease: ${prediction.disease}`, 20, yPosition)
    yPosition += 7
    doc.text(`Confidence: ${prediction.confidence}%`, 20, yPosition)
    yPosition += 7
    doc.text(`Severity: ${prediction.severity}`, 20, yPosition)
    yPosition += 10

    // Description
    doc.setFont(undefined, 'bold')
    doc.text('Description:', 20, yPosition)
    yPosition += 5
    doc.setFont(undefined, 'normal')
    const descLines = doc.splitTextToSize(prediction.description, pageWidth - 40)
    doc.text(descLines, 20, yPosition)
    yPosition += descLines.length * 5 + 5

    // Symptoms
    doc.setFont(undefined, 'bold')
    doc.text('Symptoms:', 20, yPosition)
    yPosition += 5
    doc.setFont(undefined, 'normal')
    const symptomLines = doc.splitTextToSize(prediction.symptoms, pageWidth - 40)
    doc.text(symptomLines, 20, yPosition)
    yPosition += symptomLines.length * 5 + 5

    // Treatment
    doc.setFont(undefined, 'bold')
    doc.text('Treatment Recommendations:', 20, yPosition)
    yPosition += 5
    doc.setFont(undefined, 'normal')
    prediction.treatment.forEach((treatment, idx) => {
      doc.text(`${idx + 1}. ${treatment}`, 25, yPosition)
      yPosition += 5
    })
    yPosition += 5

    // Weather Information
    if (weather && weather.city) {
      doc.setFont(undefined, 'bold')
      doc.text('Weather Information:', 20, yPosition)
      yPosition += 5
      doc.setFont(undefined, 'normal')
      doc.text(`Location: ${weather.city}`, 20, yPosition)
      yPosition += 5
      doc.text(`Temperature: ${weather.temperature}°C`, 20, yPosition)
      yPosition += 5
      doc.text(`Humidity: ${weather.humidity}%`, 20, yPosition)
      yPosition += 5
      doc.text(`Wind Speed: ${weather.wind_speed} m/s`, 20, yPosition)
    }

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
        className="bg-white shadow-md sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">AgroGuard AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, <span className="font-semibold">{user?.name}</span></span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div 
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { id: 'detect', label: 'Disease Detection', icon: <Camera className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
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
                className="bg-white rounded-2xl shadow-lg p-8"
                whileHover={{ shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Crop Image</h2>

                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                >
                  <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold mb-2">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, JPEG, WEBP (max 16MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  className="hidden"
                />

                {/* Camera Button */}
                <button
                  onClick={startCamera}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  <Camera className="w-5 h-5" />
                  Use Camera
                </button>

                {/* Camera View */}
                {cameraActive && (
                  <motion.div
                    className="mt-6 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                    <div className="flex gap-4">
                      <button
                        onClick={capturePhoto}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                      >
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Preview */}
                {image && !cameraActive && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <img src={image} alt="Preview" className="w-full rounded-lg" />
                  </motion.div>
                )}
              </motion.div>

              {/* Location Input */}
              <motion.div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
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
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition font-semibold"
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
                  className="bg-blue-50 rounded-lg p-6 text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <p className="text-blue-900 font-semibold">Analyzing image...</p>
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
    </div>
  )
}
