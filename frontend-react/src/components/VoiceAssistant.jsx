import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Mic, Volume2, X, Send } from 'lucide-react'

export default function VoiceAssistant({ prediction, weather }) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState([])
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

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
  }, [])

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    let response = ''

    if (lowerCommand.includes('disease') || lowerCommand.includes('what')) {
      response = `The detected disease is ${prediction?.disease?.replace(/_/g, ' ')}. Confidence is ${prediction?.confidence}%.`
    } else if (lowerCommand.includes('treatment') || lowerCommand.includes('how')) {
      response = `Here are the treatment recommendations: ${prediction?.treatment?.slice(0, 2).join('. ')}`
    } else if (lowerCommand.includes('weather')) {
      response = `Current weather: Temperature is ${weather?.temperature} degrees, Humidity is ${weather?.humidity}%, Wind speed is ${weather?.wind_speed} meters per second.`
    } else if (lowerCommand.includes('risk')) {
      const riskLevel = weather?.humidity > 80 ? 'High' : weather?.humidity > 60 ? 'Medium' : 'Low'
      response = `Disease risk level is ${riskLevel} based on current weather conditions.`
    } else if (lowerCommand.includes('help')) {
      response = 'You can ask me about the disease, treatment, weather, or risk level. Just say what you want to know.'
    } else {
      response = 'I can help you with disease information, treatment recommendations, weather data, and risk assessment. What would you like to know?'
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
    utterance.rate = 0.9
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
          <span className="font-semibold">AI Voice Assistant</span>
        </div>
        <button onClick={clearChat} className="hover:bg-white/20 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-light">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-8">
            <p className="mb-2">👋 Hello! I'm your AI Assistant</p>
            <p>Ask me about disease, treatment, weather, or risk level</p>
          </div>
        )}
        
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
            onClick={() => handleVoiceCommand('What is the disease?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            🦠 Disease
          </button>
          <button
            onClick={() => handleVoiceCommand('What is the treatment?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            💊 Treatment
          </button>
          <button
            onClick={() => handleVoiceCommand('What is the weather?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            🌦️ Weather
          </button>
          <button
            onClick={() => handleVoiceCommand('What is the risk level?')}
            className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            ⚠️ Risk
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
