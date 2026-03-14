import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Mic, Volume2, X } from 'lucide-react'

export default function VoiceAssistant({ prediction, weather }) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState([])
  const [voiceGender, setVoiceGender] = useState('female') // 'female' or 'male'
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  // Initialize speech recognition and synthesis
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

    // Load voices when they're available
    const loadVoices = () => {
      if (synthRef.current.getVoices().length > 0) {
        console.log('Voices loaded:', synthRef.current.getVoices().length)
      }
    }

    synthRef.current.onvoiceschanged = loadVoices
    loadVoices()
  }, [])

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    let response = ''

    // Disease questions
    if (lowerCommand.includes('disease') || lowerCommand.includes('what disease') || lowerCommand.includes('detected')) {
      response = `The detected disease is ${prediction?.disease?.replace(/_/g, ' ')}. Confidence level is ${prediction?.confidence}%. Severity is ${prediction?.severity}.`
    } 
    // Treatment questions
    else if (lowerCommand.includes('treatment') || lowerCommand.includes('how to treat') || lowerCommand.includes('cure')) {
      const treatments = prediction?.treatment?.join('. ')
      response = `Here are the treatment recommendations: ${treatments}`
    } 
    // Weather questions
    else if (lowerCommand.includes('weather') || lowerCommand.includes('temperature') || lowerCommand.includes('humidity')) {
      response = `Current weather in ${weather?.city}: Temperature is ${weather?.temperature} degrees Celsius, Humidity is ${weather?.humidity}%, Wind speed is ${weather?.wind_speed} meters per second, Condition is ${weather?.description}.`
    } 
    // Risk questions
    else if (lowerCommand.includes('risk') || lowerCommand.includes('danger') || lowerCommand.includes('safe')) {
      const riskLevel = weather?.humidity > 80 ? 'High' : weather?.humidity > 60 ? 'Medium' : 'Low'
      response = `Disease risk level is ${riskLevel} based on current weather conditions. ${weather?.humidity > 80 ? 'High humidity increases disease spread risk.' : weather?.humidity > 60 ? 'Moderate humidity creates favorable conditions for disease.' : 'Low humidity reduces disease risk.'}`
    } 
    // Symptoms
    else if (lowerCommand.includes('symptom') || lowerCommand.includes('sign') || lowerCommand.includes('look')) {
      response = `Symptoms of ${prediction?.disease?.replace(/_/g, ' ')}: ${prediction?.symptoms}`
    }
    // Description
    else if (lowerCommand.includes('describe') || lowerCommand.includes('tell me') || lowerCommand.includes('explain')) {
      response = `${prediction?.disease?.replace(/_/g, ' ')}: ${prediction?.description}`
    }
    // Help
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can')) {
      response = 'I can help you with: disease information, treatment recommendations, weather data, risk assessment, symptoms, and description. Just ask me anything about your crop.'
    } 
    // Default
    else {
      response = `You asked about "${command}". I can help with disease information, treatment, weather, risk level, symptoms, and description. What would you like to know?`
    }

    addMessage('user', command)
    addMessage('assistant', response)
    speakResponse(response)
  }

  // Add message to chat
  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, id: Date.now() }])
  }

  // Text to speech with female voice
  const speakResponse = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = voiceGender === 'female' ? 1.5 : 0.7
    utterance.volume = 1

    // Get available voices
    const voices = synthRef.current.getVoices()
    console.log('Available voices:', voices.length, voiceGender)

    if (voices.length > 0) {
      if (voiceGender === 'female') {
        // Try to find female voice
        let femaleVoice = voices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('woman') ||
          v.name.toLowerCase().includes('samantha') ||
          v.name.toLowerCase().includes('victoria') ||
          v.name.toLowerCase().includes('moira')
        )
        
        // If no female voice found, use any voice with higher index
        if (!femaleVoice && voices.length > 1) {
          femaleVoice = voices[1]
        }
        
        if (femaleVoice) {
          utterance.voice = femaleVoice
          console.log('Using female voice:', femaleVoice.name)
        }
      } else {
        // Try to find male voice
        let maleVoice = voices.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('man') ||
          v.name.toLowerCase().includes('david') ||
          v.name.toLowerCase().includes('alex') ||
          v.name.toLowerCase().includes('google uk')
        )
        
        // If no male voice found, use first voice
        if (!maleVoice && voices.length > 0) {
          maleVoice = voices[0]
        }
        
        if (maleVoice) {
          utterance.voice = maleVoice
          console.log('Using male voice:', maleVoice.name)
        }
      }
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      setIsSpeaking(false)
    }

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
    <div className="flex flex-col h-[600px] bg-white group">
      {/* Header */}
      <div className="p-8 bg-gray-900 text-white flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/30 transition-all duration-700" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-black tracking-tight">AI Assistant</h3>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Voice Guidance System</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {isListening ? 'Listening...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-emerald-500" />
            </div>
            <h4 className="text-lg font-black text-gray-900">How can I help you?</h4>
            <p className="text-xs text-gray-400 max-w-[200px] font-medium leading-relaxed">
              Ask about disease details, treatment plans, or weather risks.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-5 rounded-[2rem] shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
              }`}>
                <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white border-t border-gray-100">
        <div className="flex flex-col items-center space-y-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? () => recognitionRef.current.stop() : () => recognitionRef.current.start()}
            className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl transition-all duration-500 ${
              isListening 
                ? 'bg-red-500 shadow-red-500/20 text-white scale-110' 
                : 'bg-emerald-600 shadow-emerald-600/20 text-white'
            }`}
          >
            {isListening ? (
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                <X className="w-8 h-8 relative z-10" />
              </div>
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </motion.button>
          
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
              {isListening ? 'Click to stop' : 'Click to speak'}
            </p>
            {transcript && (
              <p className="text-sm font-bold text-emerald-600 animate-pulse italic">
                "{transcript}..."
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
