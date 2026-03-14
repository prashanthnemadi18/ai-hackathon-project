import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log('🚀 main.jsx loading...')
console.log('React version:', React.version)
console.log('Root element:', document.getElementById('root'))

try {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  console.log('✅ Root created successfully')
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('✅ App rendered successfully')
} catch (error) {
  console.error('❌ Error rendering app:', error)
  document.body.innerHTML = '<h1>Error: ' + error.message + '</h1>'
}
