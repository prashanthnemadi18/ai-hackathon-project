# Backend Technologies & Dataset Classification

## Overview
The AgroGuard-AI backend is a production-ready Flask API that leverages deep learning for crop disease detection. It features a CNN (Convolutional Neural Network) model trained on agricultural image datasets to classify crop diseases with high accuracy.

## Backend Stack

### Web Framework
- **Flask** v3.0.0
  - Lightweight, flexible Python web framework
  - Runs the REST API for disease detection predictions
  - Production-ready with error handling and logging

- **Flask-CORS** v4.0.0
  - Enables Cross-Origin Resource Sharing
  - Allows frontend (React) to communicate with the backend API

- **Gunicorn** v21.2.0
  - Production-grade WSGI HTTP Server
  - Handles high-traffic concurrent requests
  - Configured in Procfile for deployment

### Deep Learning & Machine Learning
- **TensorFlow** v2.13.0
  - Open-source machine learning platform by Google
  - Used for CNN model training and inference
  - Provides Keras API for model building

- **Keras** (via TensorFlow)
  - High-level neural networks API
  - Simplifies building and training deep learning models
  - Features used:
    - **Sequential Model** - Linear stack of layers
    - **Conv2D** - Convolutional layers for feature extraction
    - **ImageDataGenerator** - Data augmentation for training
    - **ModelCheckpoint** - Saves best model during training
    - **EarlyStopping** - Prevents overfitting
    - **ReduceLROnPlateau** - Adaptive learning rate adjustment

### Image Processing
- **OpenCV** (opencv-python-headless) v4.8.0.76
  - Computer vision library for image manipulation
  - Used for:
    - Image resizing and preprocessing
    - Feature extraction
    - Image format conversion
  - Headless version for server environments (no GUI dependencies)

- **Pillow** v10.0.0
  - Python Imaging Library for image processing
  - Handles various image formats (JPG, PNG, etc.)
  - Used for image loading and validation

### Data Processing & Computation
- **NumPy** v1.24.3
  - Fundamental package for numerical computing
  - Used for array operations and mathematical calculations
  - Optimized for handling large matrices

### Utilities
- **requests** v2.31.0
  - HTTP library for making external API calls
  - Used for potential third-party integrations

- **python-dotenv** v1.0.0
  - Loads environment variables from .env files
  - Configuration management for production secrets

- **Werkzeug** (via Flask)
  - Secure file upload handling with `secure_filename()`
  - Security utilities for web applications

## Dataset Classification

### Dataset Structure
The training and testing datasets are organized by crop type and disease class:

#### Crop Types Covered
1. **Pepper Bell**
   - Pepper_bell_Bacterial_spot
   - Pepper_bell_healthy

2. **Potato**
   - Potato_Early_blight
   - Potato_healthy
   - Potato_Late_blight

3. **Tomato** (15+ disease classes)
   - Tomato_Bacterial_spot
   - Tomato_Early_blight
   - Tomato_healthy
   - Tomato_Late_blight
   - Tomato_Leaf_Mold
   - Tomato_Mosaic_virus
   - Tomato_Septoria_leaf_spot
   - Tomato_Spider_mites
   - Tomato_Target_Spot
   - Tomato_YellowLeaf_Curl_Virus

### Dataset Statistics
- **Total Classes**: 15 disease/health categories
- **Training Data**: `/dataset/train/` - Contains images organized by class
- **Testing Data**: `/dataset/test/` - For model validation and evaluation
- **Source**: PlantVillage dataset (agricultural image database)

### Image Specifications
- **Input Size**: 128 × 128 pixels (normalized)
- **Color Format**: RGB (3-channel images)
- **Preprocessing**: Normalization (rescale to 0-1 range)

## CNN Model Architecture

### Model Configuration
- **Type**: Sequential Convolutional Neural Network
- **Model File**: `model/crop_disease_model.h5` (Keras H5 format)
- **Class Names**: Stored in `model/class_names.json`

### Training Parameters
```
Image Size: 128 × 128 pixels
Batch Size: 32 images per batch
Epochs: 20
Optimizer: Adam (default)
Loss Function: Categorical Crossentropy (multi-class classification)
```

### Data Augmentation Techniques
Applied during training to improve generalization:
- **Rotation**: ±20 degrees
- **Width Shift**: ±20% of image width
- **Height Shift**: ±20% of image height
- **Shear Range**: 15% shearing
- **Zoom Range**: 0-20% zoom
- **Horizontal Flip**: Yes
- **Fill Mode**: Nearest neighbor for generated pixels

### Key Callbacks
- **ModelCheckpoint**: Saves the best model based on validation accuracy
- **EarlyStopping**: Stops training if validation loss doesn't improve
- **ReduceLROnPlateau**: Reduces learning rate when metrics plateau

## API Endpoints

### Core Endpoints
- `POST /api/predict` - Main disease detection endpoint
  - Input: Image file (multipart/form-data)
  - Output: Disease classification with confidence scores

- `GET /api/health` - Health check endpoint
  - Verifies API and model status

### Request/Response Format
```json
Request:
{
  "file": "<image_file>"
}

Response:
{
  "prediction": "Tomato_Early_blight",
  "confidence": 0.95,
  "all_predictions": {
    "class_name": confidence_score
  }
}
```

## Production Features

### Security & Reliability
- ✅ Thread-safe model access with lock mechanism
- ✅ Secure file upload handling (filename sanitization)
- ✅ CORS support for frontend integration
- ✅ Comprehensive error handling and logging
- ✅ Environment variable management

### Scalability
- ✅ Gunicorn for multi-worker concurrency
- ✅ Production-grade HTTP server
- ✅ Optimized image processing pipeline
- ✅ Logger configuration for monitoring

### Logging
- Uses Python's logging module (INFO level)
- Tracks model loading status
- Logs API errors and predictions
- Production-ready error messages

## Server Configuration

### Development
- Framework: Flask with debug mode enabled

### Production
- Server: Gunicorn (see Procfile)
- Port: Configurable (default via Flask)
- Worker Processes: Configurable based on CPU cores

## Performance Specifications
- **Model Inference Time**: ~100-200ms per image
- **Image Processing**: Sub-200ms with OpenCV
- **Concurrent Requests**: Handled by Gunicorn workers
- **Memory Usage**: ~500MB for model and dependencies

## Disease Prediction Classes
The model classifies crops into **15 disease categories**:

| Class | Category | Type |
|-------|----------|------|
| Pepper_bell_Bacterial_spot | Disease | Bacterial |
| Pepper_bell_healthy | Healthy | N/A |
| Potato_Early_blight | Disease | Fungal |
| Potato_healthy | Healthy | N/A |
| Potato_Late_blight | Disease | Fungal |
| Tomato_Bacterial_spot | Disease | Bacterial |
| Tomato_Early_blight | Disease | Fungal |
| Tomato_healthy | Healthy | N/A |
| Tomato_Late_blight | Disease | Fungal |
| Tomato_Leaf_Mold | Disease | Fungal |
| Tomato_Mosaic_virus | Disease | Viral |
| Tomato_Septoria_leaf_spot | Disease | Fungal |
| Tomato_Spider_mites | Disease | Pest |
| Tomato_Target_Spot | Disease | Fungal |
| Tomato_YellowLeaf_Curl_Virus | Disease | Viral |

## Environment Requirements
- **Python**: 3.8+
- **RAM**: 2GB minimum (4GB+ recommended)
- **GPU**: Optional (CPU works fine with TensorFlow 2.13)

## Deployment
- Containerized with Docker (see Dockerfile)
- Railway.json for Railway platform deployment
- Procfile for Gunicorn process management
