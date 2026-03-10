# AgroGuard AI - Modern React Frontend

A professional, modern frontend for the AgroGuard AI crop disease detection system built with React, Tailwind CSS, and Framer Motion.

## Features

✨ **Modern UI/UX**
- Responsive design for all devices
- Smooth animations with Framer Motion
- Beautiful gradient backgrounds
- Real-time interactions

🎯 **Key Pages**
- **Home Page**: Landing page with features showcase
- **Login Page**: Secure authentication interface
- **Dashboard**: Main application with disease detection
- **Analytics**: Statistics and recent scan history

📸 **Disease Detection**
- Image upload with drag-and-drop
- Real-time camera capture
- Instant disease prediction
- Confidence scores

🌦️ **Weather Integration**
- Location-based weather data
- Disease risk assessment
- Temperature, humidity, wind speed display

📊 **Analytics & Reports**
- Scan history and statistics
- Disease distribution charts
- PDF report generation
- Performance metrics

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

```bash
cd frontend-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will run on `http://localhost:3000`

## Project Structure

```
frontend-react/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── LoginPage.jsx         # Authentication
│   │   └── Dashboard.jsx         # Main app
│   ├── components/
│   │   ├── PrivateRoute.jsx      # Route protection
│   │   ├── WeatherCard.jsx       # Weather display
│   │   ├── PredictionCard.jsx    # Disease results
│   │   └── AnalyticsChart.jsx    # Statistics
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React 18**: UI framework
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: API calls
- **jsPDF**: PDF generation
- **Lucide React**: Icons
- **Vite**: Build tool

## Configuration

### Backend API
Update the API endpoint in `Dashboard.jsx`:
```javascript
const response = await axios.post('http://localhost:5000/api/predict', formData)
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=http://localhost:5000
```

## Features in Detail

### 1. Home Page
- Hero section with call-to-action
- Feature showcase with icons
- Statistics display
- Responsive navigation

### 2. Login Page
- Email/password authentication
- Password visibility toggle
- Demo credentials display
- Error handling

### 3. Dashboard
- **Detection Tab**:
  - Image upload area
  - Camera capture
  - Location input
  - Real-time prediction
  - Weather information
  - PDF report download

- **Analytics Tab**:
  - Statistics cards
  - Recent scans list
  - Disease distribution chart
  - Performance metrics

### 4. Components
- **WeatherCard**: Displays weather with disease risk
- **PredictionCard**: Shows disease detection results
- **AnalyticsChart**: Statistics and charts
- **PrivateRoute**: Protects authenticated routes

## Usage

### 1. Home Page
- View project information
- Click "Get Started" to login

### 2. Login
- Use demo credentials or create account
- Email: demo@agroguard.com
- Password: demo123

### 3. Dashboard
- Upload crop image or use camera
- Enter location for weather data
- View prediction results
- Download PDF report

### 4. Analytics
- View scan statistics
- Check disease distribution
- Monitor accuracy metrics

## API Integration

The frontend expects these endpoints from the backend:

```
POST /api/predict
- Input: image file, city name
- Output: disease, confidence, weather, treatment

GET /api/health
- Output: server status, model info
```

## Styling

### Tailwind CSS
- Custom colors: green-600 (primary), blue-500 (secondary)
- Responsive breakpoints: sm, md, lg
- Custom animations: float, blob

### Framer Motion
- Page transitions
- Component animations
- Hover effects
- Loading states

## Performance

- Lazy loading of components
- Optimized images
- Efficient re-renders
- Smooth animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Troubleshooting

### Backend Connection Error
- Ensure Flask backend is running on port 5000
- Check CORS configuration
- Verify API endpoint URL

### Camera Not Working
- Check browser permissions
- Use HTTPS in production
- Test on supported browsers

### PDF Generation Issues
- Ensure jsPDF is installed
- Check text encoding
- Verify file permissions

## Future Enhancements

- [ ] User authentication with backend
- [ ] Database integration
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Notification system
- [ ] Crop history tracking
- [ ] Expert consultation

## License

MIT License - Built with ❤️ for farmers

## Support

For issues or questions, please contact the development team.
