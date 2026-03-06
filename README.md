🌾 AgroGuard AI
Smart Crop Disease Detection & Weather-Based Crop Health System

AgroGuard AI is an AI-powered agriculture support system that helps farmers detect plant diseases early using computer vision and weather analysis.

The platform allows farmers to scan or upload crop leaf images, and the AI model identifies diseases instantly. It also analyzes real-time weather conditions based on the farmer's location to predict possible disease risks and provide treatment recommendations.

This system helps farmers take early preventive action, reducing crop loss and improving agricultural productivity.

📌 Project Overview

Crop diseases are a major challenge in agriculture, causing 20–40% crop loss worldwide every year. Many farmers struggle to identify diseases early due to lack of access to agricultural experts.

AgroGuard AI provides an intelligent and accessible solution by combining:

Deep Learning for plant disease detection

Computer Vision for leaf image analysis

Weather data analysis for disease risk prediction

Farmers can quickly understand plant health status and recommended treatments using a simple web interface.

🚩 Problem Statement

Farmers face several challenges in detecting and managing crop diseases:

Difficulty identifying plant diseases at early stages

Lack of agricultural experts in rural areas

Weather conditions that increase disease spread

Incorrect use of pesticides due to misdiagnosis

Traditional disease detection methods rely on manual inspection, which is slow and often inaccurate.

💡 Proposed Solution

AgroGuard AI provides an AI-based crop health monitoring system that helps farmers detect diseases quickly and make informed decisions.

The system works by:

Capturing or uploading an image of a crop leaf

Analyzing the image using a trained CNN deep learning model

Detecting the plant disease with a confidence score

Fetching weather data based on farmer location

Predicting disease risk based on environmental conditions

Providing treatment and prevention recommendations

⭐ Key Features
🌿 AI Crop Disease Detection

Detects plant diseases using a trained Convolutional Neural Network (CNN) model.

📷 Camera-Based Leaf Scanning

Farmers can capture plant leaf images directly using the device camera.

📊 Disease Prediction with Confidence Score

The AI model predicts the disease and displays a confidence level.

Example:

Disease: Tomato Early Blight
Confidence: 92%

🌦 Weather-Based Disease Risk Analysis

The system retrieves real-time weather data such as:

Temperature

Humidity

Wind speed

These conditions are analyzed to estimate disease spread risk.

💊 Treatment Recommendations

Provides suggestions for disease management, including:

Recommended pesticides

Preventive actions

Crop care tips

🧠 System Architecture
Farmer / User
      ↓
Leaf Image Upload / Camera Scan
      ↓
Image Preprocessing
      ↓
CNN Disease Detection Model
      ↓
Weather API (Location-based)
      ↓
Disease Risk Analysis
      ↓
Crop Health Report
      ↓
Treatment Recommendation
🛠 Technologies Used
Frontend

HTML

CSS

JavaScript

Backend

Python

Flask

AI / Machine Learning

TensorFlow

Keras

OpenCV

NumPy

Scikit-learn

API Integration

OpenWeather API for real-time weather data

📊 Dataset

The model is trained using the PlantVillage Dataset, which contains thousands of labeled plant leaf images.

Dataset features:

50,000+ plant leaf images

Multiple crop types

Healthy and diseased plants

Dataset source:

https://www.kaggle.com/datasets/emmarex/plantdisease

For this prototype, approximately 3000–5000 images across multiple plant disease categories were used for model training.

⚙️ Model Approach

The system uses a Convolutional Neural Network (CNN) for image classification.

Training steps include:

Dataset collection

Image preprocessing (resizing and normalization)

CNN model training

Model evaluation

Saving the trained model

Real-time prediction for uploaded images

🚀 How the System Works

User uploads or captures a crop leaf image

The system preprocesses the image

The trained CNN model analyzes the image

The model predicts the disease type

Weather data is retrieved using the user's location

Disease risk is calculated based on environmental factors

Results and treatment suggestions are displayed to the user

🌍 Impact

AgroGuard AI helps:

Farmers detect diseases early

Reduce crop losses

Improve agricultural productivity

Promote AI-based smart farming solutions

🔮 Future Improvements

Possible future enhancements include:

Mobile application for farmers

Voice assistant for rural users

Drone-based crop monitoring

Integration with agricultural advisory systems

AI-based crop yield prediction
