const API_URL = 'http://localhost:5000/api';

let selectedFile = null;

// Image upload handling
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        displayPreview(file);
        document.getElementById('analyzeBtn').disabled = false;
    }
});

// Drag and drop
const uploadBox = document.getElementById('uploadBox');
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#43e97b';
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.borderColor = '#667eea';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#667eea';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        displayPreview(file);
        document.getElementById('analyzeBtn').disabled = false;
    }
});

function displayPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('uploadBox').style.display = 'none';
        document.getElementById('previewSection').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function resetUpload() {
    selectedFile = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('uploadBox').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('results').style.display = 'none';
}

async function analyzeCrop() {
    if (!selectedFile) return;

    const city = document.getElementById('cityInput').value || 'New Delhi';
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('analyzeBtn').disabled = true;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('city', city);

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Failed to connect to server. Make sure backend is running on port 5000.');
        console.error(error);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('analyzeBtn').disabled = false;
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    
    const severityClass = data.severity.toLowerCase().replace(' ', '-');
    
    resultsDiv.innerHTML = `
        <div class="result-card">
            <h3>🔬 Disease Analysis</h3>
            <div class="disease-info">
                <h2>${data.disease.replace(/_/g, ' ')}
                    <span class="confidence">${data.confidence}% confident</span>
                </h2>
                <span class="severity ${severityClass}">Severity: ${data.severity}</span>
                <p style="margin-top: 15px;"><strong>Description:</strong> ${data.description}</p>
                <p><strong>Symptoms:</strong> ${data.symptoms}</p>
            </div>
        </div>

        <div class="result-card">
            <h3>💊 Treatment Recommendations</h3>
            <ul class="treatment-list">
                ${data.treatment.map(t => `<li>✓ ${t}</li>`).join('')}
            </ul>
        </div>

        <div class="result-card">
            <h3>🌤️ Weather Conditions</h3>
            <div class="weather-card">
                <h4>${data.weather.city}</h4>
                <p>${data.weather.description}</p>
                <div class="weather-info">
                    <div class="weather-item">
                        <strong>${data.weather.temperature}°C</strong>
                        <span>Temperature</span>
                    </div>
                    <div class="weather-item">
                        <strong>${data.weather.humidity}%</strong>
                        <span>Humidity</span>
                    </div>
                    <div class="weather-item">
                        <strong>${data.weather.wind_speed} m/s</strong>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <h4>Weather Advisory:</h4>
                <ul class="treatment-list">
                    ${data.weather_advice.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}
