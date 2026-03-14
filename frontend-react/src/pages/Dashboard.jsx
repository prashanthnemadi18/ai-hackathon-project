import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Download, LogOut, Activity, Sparkles, Camera, BarChart3, Mic, MapPin, Brain, Zap, TrendingUp, Award, AlertCircle, CheckCircle, Loader, Cloud, Leaf, X, CheckCircle2 } from 'lucide-react'
import jsPDF from 'jspdf'
import axios from 'axios'
import { API_URL } from '../config'
import CameraCapture from '../components/CameraCapture'
import PredictionCard from '../components/PredictionCard'
import WeatherCard from '../components/WeatherCard'
import AnalyticsChart from '../components/AnalyticsChart'
import VoiceAssistant from '../components/VoiceAssistant'

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('analyze')
  const [showCamera, setShowCamera] = useState(false)
  const [showVoice, setShowVoice] = useState(false)
  const [location, setLocation] = useState('New Delhi')
  const [showLocationInput, setShowLocationInput] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target.result)
        setPrediction(null)
        setError(null)
        setShowCamera(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = (blob) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      setSelectedImage(event.target.result)
      setPrediction(null)
      setError(null)
    }
    reader.readAsDataURL(blob)
  }

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }
    setLoading(true)
    setError(null)
    setUploadProgress(0)
    try {
      const formData = new FormData()
      const canvas = document.createElement('canvas')
      const img = new Image()
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(async (blob) => {
          formData.append('image', blob, 'image.jpg')
          formData.append('city', location)
          try {
            const response = await axios.post(`${API_URL}/api/predict`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setUploadProgress(progress)
              }
            })
            const treatmentArray = Array.isArray(response.data.treatment) ? response.data.treatment : [response.data.treatment]
            setPrediction({
              disease: response.data.disease,
              confidence: Math.round(response.data.confidence),
              symptoms: response.data.symptoms || 'No symptoms information available',
              treatment: treatmentArray,
              severity: response.data.severity || 'Unknown',
              description: response.data.description || 'No description available',
              timestamp: new Date().toLocaleString()
            })
            if (response.data.weather && !response.data.weather.error) {
              setWeather({
                temperature: response.data.weather.temperature,
                humidity: response.data.weather.humidity,
                description: response.data.weather.condition || 'Clear',
                city: location,
                wind_speed: response.data.weather.wind_speed || 0
              })
            }
          } catch (err) {
            console.error('Prediction error:', err)
            setError(err.response?.data?.error || 'Analysis failed. Please try again.')
          } finally {
            setLoading(false)
            setUploadProgress(0)
          }
        })
      }
      img.src = selectedImage
    } catch (err) {
      setError('Failed to process image')
      setLoading(false)
    }
  }

  const generatePDF = () => {
    if (!prediction) return
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    let yPosition = 20
    pdf.setFontSize(20)
    pdf.setTextColor(16, 185, 129)
    pdf.text('AgroGuard AI - Disease Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Disease: ${prediction.disease}`, 20, yPosition)
    yPosition += 8
    pdf.text(`Confidence: ${Math.round(prediction.confidence)}%`, 20, yPosition)
    yPosition += 8
    pdf.text(`Severity: ${prediction.severity}`, 20, yPosition)
    yPosition += 8
    pdf.text(`Location: ${location}`, 20, yPosition)
    yPosition += 8
    pdf.text(`Date: ${prediction.timestamp}`, 20, yPosition)
    yPosition += 15
    pdf.setFontSize(14)
    pdf.setTextColor(16, 185, 129)
    pdf.text('Description:', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    const descLines = pdf.splitTextToSize(prediction.description, pageWidth - 40)
    pdf.text(descLines, 20, yPosition)
    yPosition += descLines.length * 6 + 10
    pdf.setFontSize(14)
    pdf.setTextColor(16, 185, 129)
    pdf.text('Symptoms:', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    const sympLines = pdf.splitTextToSize(prediction.symptoms, pageWidth - 40)
    pdf.text(sympLines, 20, yPosition)
    yPosition += sympLines.length * 6 + 10
    pdf.setFontSize(14)
    pdf.setTextColor(16, 185, 129)
    pdf.text('Treatment:', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    prediction.treatment.forEach((t, i) => {
      const lines = pdf.splitTextToSize(`${i + 1}. ${t}`, pageWidth - 40)
      pdf.text(lines, 20, yPosition)
      yPosition += lines.length * 6
    })
    pdf.save(`AgroGuard_Report_${Date.now()}.pdf`)
  }

  const tabs = [
    { id: 'analyze', label: 'AI Analysis', icon: Brain },
    { id: 'weather', label: 'Environment', icon: Cloud },
    { id: 'analytics', label: 'Performance', icon: TrendingUp },
    { id: 'voice', label: 'Assistant', icon: Mic }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden selection:bg-primary/20">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col z-50">
        <div className="p-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">AgroGuard</span>
          </motion.div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  activeTab === tab.id 
                    ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <tab.icon className={`w-5 h-5 transition-transform duration-300 ${
                  activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                <span className="font-bold text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 bg-emerald-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 overflow-hidden shadow-sm">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || user?.username || 'User'}&background=10b981&color=fff`} alt="Avatar" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm text-gray-900 truncate">{user?.name || user?.username || 'Farmer'}</p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Premium Plan</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 py-6 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
            <h1 className="text-2xl font-black text-gray-900 capitalize">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-600 outline-none w-24"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-6xl mx-auto"
            >
              {activeTab === 'analyze' && (
                <div className="space-y-10">
                  {/* Analysis Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="modern-card p-10 bg-white relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center border-dashed border-2 border-gray-200 hover:border-emerald-600/30 transition-all">
                        {!selectedImage ? (
                          <div className="space-y-6">
                            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                              <Upload className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900">Upload Crop Image</h2>
                            <p className="text-gray-400 max-w-sm mx-auto">
                              Drag and drop your crop photo here or use the buttons below to start the AI analysis.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center mt-10">
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center gap-3"
                              >
                                <Upload className="w-5 h-5" />
                                Browse Files
                              </button>
                              <button
                                onClick={() => setShowCamera(true)}
                                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-3"
                              >
                                <Camera className="w-5 h-5" />
                                Open Camera
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full relative group">
                            <img
                              src={selectedImage}
                              alt="Selected crop"
                              className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-3xl backdrop-blur-sm">
                              <button
                                onClick={() => setSelectedImage(null)}
                                className="p-4 bg-white text-red-500 rounded-2xl font-bold shadow-xl hover:scale-110 transition-transform"
                              >
                                <X className="w-6 h-6" />
                              </button>
                              <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:scale-110 transition-transform disabled:opacity-50 flex items-center gap-3"
                              >
                                {loading ? <Loader className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
                                Analyze Now
                              </button>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="modern-card p-8 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold">AI Status</h3>
                        </div>
                        <p className="text-white/80 text-sm mb-6 leading-relaxed">
                          Our neural network is ready to analyze your crops with 95% accuracy.
                        </p>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: loading ? `${uploadProgress}%` : '100%' }}
                          />
                        </div>
                        <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-wider">
                          <span>System Ready</span>
                          <span>{loading ? 'Processing...' : 'Online'}</span>
                        </div>
                      </div>

                      <div className="modern-card p-8 bg-white border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                          Status Check
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                              <Activity size={24} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-800">AI Model</p>
                              <p className="text-[10px] text-gray-400">Healthy & Active</p>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  {prediction && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <PredictionCard prediction={prediction} weather={weather} />
                      <button
                        onClick={generatePDF}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Download Analysis Report
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'weather' && weather && (
                <div className="max-w-2xl mx-auto">
                  <WeatherCard weather={weather} location={location} />
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <AnalyticsChart />
                </div>
              )}

              {activeTab === 'voice' && (
                <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
                  <VoiceAssistant 
                    prediction={prediction} 
                    weather={weather} 
                    onClose={() => setActiveTab('analyze')} 
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCamera(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900">Live Camera</h2>
                  <button onClick={() => setShowCamera(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <CameraCapture onCapture={(blob) => {
                  handleCameraCapture(blob)
                  setShowCamera(false)
                }} onClose={() => setShowCamera(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
