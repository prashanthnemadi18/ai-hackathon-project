# 🌾 AgroGuard AI - Smart Crop Disease Detection System

AI-powered crop disease detection using CNN with real-time weather integration.

## 📁 Project Structure

```
AgroGuard-AI/
├── frontend/              # Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── backend/               # Backend (Flask API)
│   ├── app.py            # Main Flask application
│   ├── train_model.py    # CNN training script
│   ├── prepare_dataset.py # Dataset preparation
│   ├── requirements.txt
│   ├── model/            # Trained model (generated)
│   └── uploads/          # Temporary uploads
│
└── dataset/              # Training data (generated)
    ├── train/
    └── test/
```

## 🚀 Quick Start

### Step 1: Prepare Dataset

```bash
cd AgroGuard-AI/backend
python prepare_dataset.py
```

This will organize images from the `archive/PlantVillage` folder into train/test splits.

### Step 2: Train the Model

```bash
python train_model.py
```

Training takes 15-30 minutes. Model will be saved to `backend/model/`.

### Step 3: Start Backend Server

```bash
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`

### Step 4: Open Frontend

Open `frontend/index.html` in your browser or use a local server:

```bash
cd ../frontend
python -m http.server 8000
```

Visit `http://localhost:8000`

## 🔑 Weather API (Optional)

Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):

```bash
export OPENWEATHER_API_KEY=your_key_here
```

## 🦠 Supported Diseases

- Pepper Bell: Bacterial Spot, Healthy
- (Expandable to Tomato, Potato, Corn, Grape)

## 🛠️ Tech Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Flask, TensorFlow/Keras
- Model: CNN (Convolutional Neural Network)
- Dataset: PlantVillage

## 📝 API Endpoints

- `GET /api/health` - Check server status
- `POST /api/predict` - Analyze crop image

Built with ❤️ for farmers
