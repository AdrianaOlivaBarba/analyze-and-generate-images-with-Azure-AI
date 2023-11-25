import React, { useState } from 'react';
import './App.css';  // Si decides usar un archivo de estilos

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageAnalysis = () => {
    // Lógica para analizar la imagen
    console.log('Analizando la imagen:', imageUrl);
  };

  const handleImageGeneration = () => {
    // Lógica para generar la imagen
    console.log('Generando la imagen:', imageUrl);
  };

  return (
    <div className="app">
      <h1>Aplicación de Computer Vision</h1>
      <input
        type="text"
        placeholder="Introduce la URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleImageAnalysis}>Analizar Imagen</button>
      <button onClick={handleImageGeneration}>Generar Imagen</button>
    </div>
  );
}

export default App;

# Crear un recurso de Computer Vision en Azure
az cognitiveservices account create \
    --name "mi-recurso-cv" \
    --resource-group "mi-grupo-de-recursos" \
    --kind "ComputerVision" \
    --sku "S0" \
    --location "mi-ubicacion"

// azure-image-analysis.js
const analyzeImage = async (imageUrl) => {
  const subscriptionKey = 'tu-clave-de-suscripcion';  // Reemplaza con tu clave de suscripción de Computer Vision
  const endpoint = 'tu-endpoint';  // Reemplaza con el endpoint de tu recurso de Computer Vision

  const params = {
    visualFeatures: 'Description',  // Puedes personalizar las características visuales según tus necesidades
    details: 'Celebrities,Landmarks',
    language: 'en',
  };

  const response = await fetch(`${endpoint}/vision/v4.0/analyze?${new URLSearchParams(params)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: JSON.stringify({ url: imageUrl }),
  });

  if (!response.ok) {
    throw new Error('Error al analizar la imagen');
  }

  return response.json();
};

export default analyzeImage;


// App.js
import React, { useState } from 'react';
import analyzeImage from './azure-image-analysis';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleImageAnalysis = async () => {
    try {
      setLoading(true);
      const results = await analyzeImage(imageUrl);
      setAnalysisResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const DisplayResults = () => {
    if (!analysisResults) {
      return null;
    }

    return (
      <div>
        <h2>Resultados del Análisis:</h2>
        <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        <p>Dirección URL de la imagen analizada: {imageUrl}</p>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Aplicación de Computer Vision</h1>
      <input
        type="text"
        placeholder="Introduce la URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleImageAnalysis} disabled={loading}>
        {loading ? 'Analizando...' : 'Analizar Imagen'}
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;
