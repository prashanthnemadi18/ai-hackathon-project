import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Mic, Volume2, X, HelpCircle } from 'lucide-react'

export default function ProjectVoiceGuide() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState([])
  const [showGuide, setShowGuide] = useState(true)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  const projectGuide = {
    welcome: "Welcome to AgroGuard AI! I'm your voice guide. I can help you understand how to use this app. You can ask me about login, how to upload images, disease detection, weather information, or anything else about the project.",
    
    login: "To login, you need a username and password. Demo username is 'farmer' and password is 'demo123'. Just enter these and click login. If you don't have an account, you can create one with any username and password.",
    
    upload: "After login, go to the dashboard. You can upload a crop image by clicking the upload area or using your camera. Take a clear photo of the diseased leaf and upload it.",
    
    detection: "Once you upload an image, our AI will analyze it and tell you what disease your crop has. It will show the disease name, confidence level, and severity.",
    
    weather: "The app automatically gets weather information for your location. It shows temperature, humidity, wind speed, and disease risk level based on weather.",
    
    treatment: "Based on the detected disease, the app provides treatment recommendations. You can read them or ask me to read them aloud.",
    
    report: "You can download a PDF report with all the information about the disease, weather, and treatment recommendations.",
    
    features: "AgroGuard AI has these features: Real-time disease detection using AI, Weather integration, Treatment recommendations, PDF reports, Voice assistance, and Analytics.",
    
    help: "You can ask me about: How to login, How to upload images, What diseases we detect, How weather affects crops, Treatment recommendations, How to download reports, or any other questions about the app."
  }

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            handleVoiceCommand(transcript)
          } else {
            interim += transcript
          }
        }
        setTranscript(interim)
      }
    }

    // Auto-play welcome message
    setTimeout(() => {
      speakResponse(projectGuide.welcome)
      addMessage('assistant', projectGuide.welcome)
    }, 1000)
  }, [])

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    let response = projectGuide.help

    if (lowerCommand.includes('login') || lowerCommand.includes('sign')) {
      response = projectGuide.login
    } else if (lowerCommand.includes('upload') || lowerCommand.includes('image')) {
      response = projectGuide.upload
    } else if (lowerCommand.includes('disease') || lowerCommand.includes('detect')) {
      response = projectGuide.detection
    } else if (lowerCommand.includes('weather') || lowerCommand.includes('temperature')) {
      response = projectGuide.weather
    } else if (lowerCommand.includes('treatment') || lowerCommand.includes('cure')) {
      response = projectGuide.treatment
    } else if (lowerCommand.includes('report') || lowerCommand.includes('pdf')) {
      response = projectGuide.report
    } else if (lowerCommand.includes('feature') || lowerCommand.includes('what can')) {
      response = projectGuide.features
    } else if (lowerCommand.includes('help') || lowerCommand.includes('how')) {
      response = projectGuide.help
    } else if (lowerCommand.includes('welcome') || lowerCommand.includes('start')) {
      response = projectGuide.welcome
    }

    addMessage('user', command)
    addMessage('assistant', response)
    speakResponse(response)
  }

  // Add message to chat
  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, id: Date.now() }])
  }

  // Text to speech
  const speakResponse = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.85
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    synthRef.current.speak(utterance)
  }

  // Start listening
  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  // Clear chat
  const clearChat = () => {
    setMessages([])
    setTranscript('')
  }

  if (!showGuide) {
    return (
      <motion.button
        onClick={() => setShowGuide(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-secondary transition z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <HelpCircle className="w-8 h-8" />
      </motion.button>
    )
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: isSpeaking ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.6, repeat: isSpeaking ? Infinity : 0 }}
          >
            <Volume2 className="w-5 h-5" />
          </motion.div>
          <span className="font-semibold">Project Guide</span>
        </div>
        <button onClick={() => setShowGuide(false)} className="hover:bg-white/20 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-light">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-200 text-dark rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {transcript && (
          <div className="flex justify-end">
            <div className="max-w-xs px-4 py-2 rounded-lg text-sm bg-primary/50 text-white rounded-br-none italic">
              {transcript}...
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* Microphone Button */}
        <motion.button
          onClick={isListening ? stopListening : startListening}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            isListening
              ? 'bg-red-500 text-white'
              : 'bg-primary text-white hover:bg-secondary'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6, repeat: isListening ? Infinity : 0 }}
          >
            <Mic className="w-5 h-5" />
          </motion.div>
          {isListening ? 'Listening...' : 'Click to Speak'}
        </motion.button>

        {/* Quick Commands */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleVoiceCommand('How to login?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            🔐 Login
          </button>
          <button
            onClick={() => handleVoiceCommand('How to upload?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            📸 Upload
          </button>
          <button
            onClick={() => handleVoiceCommand('What features?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            ⭐ Features
          </button>
          <button
            onClick={() => handleVoiceCommand('Help me')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            ❓ Help
          </button>
        </div>

        {/* Status */}
        <div className="text-xs text-gray-500 text-center">
          {isListening && '🎤 Listening...'}
          {isSpeaking && '🔊 Speaking...'}
          {!isListening && !isSpeaking && '✓ Ready'}
        </div>
      </div>
    </motion.div>
  )
}
