# Frontend Technologies & Stack

## Overview
This is a modern React-based frontend application for the AgroGuard-AI Crop Disease Detection system. The project uses cutting-edge technologies for optimal performance, user experience, and developer productivity.

## Frontend Stack

### Core Framework
- **React** v18.2.0
  - JavaScript library for building user interfaces with component-based architecture
  - Provides reactive state management and virtual DOM for efficient rendering

### Build Tool
- **Vite** v5.0.0
  - Modern, lightning-fast build tool
  - Provides instant HMR (Hot Module Replacement) for faster development
  - Optimized production builds with tree-shaking and code splitting
  - Port: 3000 (configured in vite.config.js)

### Styling & CSS
- **Tailwind CSS** v3.3.6
  - Utility-first CSS framework for rapid UI development
  - Provides pre-defined utility classes for styling components
  - Configuration: tailwind.config.js

- **PostCSS** v8.4.32
  - Tool for transforming CSS with JavaScript plugins
  - Works with Tailwind CSS for processing CSS

- **Autoprefixer** v10.4.16
  - PostCSS plugin that adds vendor prefixes to CSS rules
  - Ensures CSS compatibility across different browsers

### Routing
- **React Router DOM** v6.20.0
  - Client-side routing library for single-page application (SPA) navigation
  - Declarative routing with dynamic route matching

### HTTP Requests
- **Axios** v1.6.0
  - Promise-based HTTP client for making API calls
  - Configured to proxy API requests to backend (http://localhost:5000)
  - Used for communication with the backend Flask server

### Animation & Motion
- **Framer Motion** v10.16.0
  - Production-ready motion library for React
  - Creates smooth animations and transitions
  - Provides gesture controls and interactive animations

### UI Components & Icons
- **Lucide React** v0.294.0
  - Lightweight, customizable SVG icon library
  - Provides consistent iconography throughout the application

### PDF Generation
- **jsPDF** v2.5.1
  - JavaScript library for generating PDF documents
  - Used for creating downloadable reports and analyses

## Build & Development Scripts

```json
"dev": "vite"              // Start development server
"build": "vite build"      // Build for production
"preview": "vite preview"  // Preview production build locally
```

## Development Requirements
- **Node.js**: ≥ 16.0.0
- **npm**: ≥ 8.0.0

## API Configuration
- Backend proxy configured in vite.config.js
- API endpoint: `http://localhost:5000`
- All requests to `/api/*` are proxied to the backend

## Project Type
- **Module Type**: ES Modules (ESM)
- **Private Package**: Yes (for workspace usage)

## Key Features Enabled by This Stack
✅ Fast development with Vite's HMR  
✅ Responsive UI with Tailwind CSS  
✅ Smooth animations with Framer Motion  
✅ Modern routing with React Router  
✅ API integration with Axios  
✅ Beautiful icons with Lucide React  
✅ PDF report generation with jsPDF  
✅ Cross-browser compatibility with Autoprefixer
