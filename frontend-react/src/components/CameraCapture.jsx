import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Camera, RotateCw, X, CameraOff, Video, VideoOff, Zap, AlertCircle } from 'lucide-react'

export default function CameraCapture({ onCapture, onClose, loading = false }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [cameraFacing, setCameraFacing] = useState('environment')
  const [isStreaming, setIsStreaming] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (error) {
      console.error('Camera error:', error)
      alert('Camera error: ' + error.message)
    }
  }

  const switchCamera = async () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    
    const newFacing = cameraFacing === 'environment' ? 'user' : 'environment'
    setCameraFacing(newFacing)
    
    setTimeout(() => startCamera(), 100)
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current && isStreaming) {
      const context = canvasRef.current.getContext('2d')
      const video = videoRef.current
      
      canvasRef.current.width = video.videoWidth
      canvasRef.current.height = video.videoHeight
      
      context.drawImage(video, 0, 0)
      
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          onCapture(blob)
          handleClose()
        }
      }, 'image/jpeg', 0.95)
    }
  }

  const handleClose = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    setIsStreaming(false)
    onClose()
  }

  return (
    <motion.div
      className="relative space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {!isStreaming ? (
        <motion.div
          className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 backdrop-blur-sm overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-200/20 rounded-full blur-xl" />
          
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">📸 Smart Camera</h3>
            <p className="text-gray-600 mb-6 font-medium">Capture high-quality crop images for AI analysis</p>
            
            <motion.button
              onClick={startCamera}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="w-6 h-6" />
              Start Camera
              <Zap className="w-4 h-4" />
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Ready to capture</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="relative bg-black rounded-3xl overflow-hidden w-full aspect-video shadow-2xl border-4 border-white/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Enhanced viewfinder overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 border-2 border-green-400 rounded-2xl" />
              <div className="absolute inset-4 border-2 border-green-400 rounded-2xl animate-pulse opacity-50" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-lg" />
              
              {/* Center crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 border-2 border-green-400 rounded-full opacity-70" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-400 opacity-50 transform -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 h-full w-0.5 bg-green-400 opacity-50 transform -translate-x-1/2" />
              </div>
              
              {/* Recording indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold">LIVE</span>
              </div>
            </div>
          </motion.div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="grid grid-cols-3 gap-4">
            <motion.button
              onClick={capturePhoto}
              className="relative py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center justify-center gap-3 overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Camera className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Capture</span>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            <motion.button
              onClick={switchCamera}
              className="relative py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center justify-center gap-3 overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <RotateCw className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Switch</span>
            </motion.button>
            
            <motion.button
              onClick={handleClose}
              className="relative py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold flex items-center justify-center gap-3 overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CameraOff className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Close</span>
            </motion.button>
          </div>
          
          {/* Instructions */}
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-bold mb-1">💡 Pro Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Ensure good lighting for best results</li>
                  <li>• Fill the frame with the affected area</li>
                  <li>• Keep the camera steady</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
