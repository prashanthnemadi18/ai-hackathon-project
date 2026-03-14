FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies with optimizations
RUN pip install --no-cache-dir --no-build-isolation -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 5000

# Run application with longer timeout
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--timeout", "180", "--workers", "1"]
