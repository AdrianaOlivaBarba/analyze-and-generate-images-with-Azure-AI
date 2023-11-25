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

# Crear un recurso de Azure OpenAI Service en Azure
az openai account create \
    --name "mi-recurso-openai" \
    --resource-group "mi-grupo-de-recursos" \
    --sku "dalle2.1" \
    --location "mi-ubicacion"

// azure-image-generation.js
const generateImage = async (text) => {
  const subscriptionKey = 'tu-clave-de-suscripcion';  // Reemplaza con tu clave de suscripción de Azure OpenAI
  const endpoint = 'tu-endpoint';  // Reemplaza con el endpoint de tu recurso de Azure OpenAI

  const prompt = text;

  const response = await fetch(`${endpoint}/v1/models/dall-e-generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${subscriptionKey}`,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Error al generar la imagen');
  }

  return response.json();
};

export default generateImage;

// App.js
import React, { useState } from 'react';
import generateImage from './azure-image-generation';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generationResults, setGenerationResults] = useState(null);

  const handleImageGeneration = async () => {
    try {
      setLoading(true);
      const results = await generateImage(text);
      setGenerationResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const DisplayResults = () => {
    if (!generationResults) {
      return null;
    }

    return (
      <div>
        <h2>Resultados de la Generación de Imágenes:</h2>
        <img src={generationResults?.data?.[0]} alt="Imagen generada" />
        <p>Texto de entrada: {text}</p>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Aplicación de Generación de Imágenes</h1>
      <input
        type="text"
        placeholder="Introduce el texto para generar la imagen"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleImageGeneration} disabled={loading}>
        {loading ? 'Generando...' : 'Generar Imagen'}
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;

// App.js
import React, { useState } from 'react';
import generateImage from './azure-image-generation';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generationResults, setGenerationResults] = useState(null);

  const handleImageGeneration = async () => {
    try {
      setLoading(true);
      const results = await generateImage(text);
      setGenerationResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const DisplayResults = () => {
    if (!generationResults) {
      return null;
    }

    return (
      <div>
        <h2>Resultados de la Generación de Imágenes:</h2>
        <img src={generationResults?.data?.[0]} alt="Imagen generada" />
        <p>Texto de entrada: {text}</p>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Aplicación de Generación de Imágenes</h1>
      <input
        type="text"
        placeholder="Introduce el texto para generar la imagen"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleImageGeneration} disabled={loading}>
        {loading ? 'Generando...' : 'Generar Imagen'}
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;

// azure-image-generation.js
const isConfigured = () => {
  return process.env.REACT_APP_OPENAI_SUBSCRIPTION_KEY && process.env.REACT_APP_OPENAI_ENDPOINT;
};

// azure-image-analysis.js
const isConfigured = () => {
  return process.env.REACT_APP_AZURE_CV_SUBSCRIPTION_KEY && process.env.REACT_APP_AZURE_CV_ENDPOINT;
};

export { isConfigured };

// App.js
import React, { useState } from 'react';
import generateImage from './azure-image-generation';
import analyzeImage from './azure-image-analysis';
import { isConfigured as isOpenAIConfigured } from './azure-image-generation';
import { isConfigured as isAzureCVConfigured } from './azure-image-analysis';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generationResults, setGenerationResults] = useState(null);
  const [warning, setWarning] = useState('');

  const handleImageGeneration = async () => {
    // Verificar la configuración de OpenAI antes de llamar a la función
    if (!isOpenAIConfigured()) {
      setWarning('La aplicación no está configurada correctamente. Consulte la documentación para obtener ayuda.');
      return;
    }

    try {
      setLoading(true);
      const results = await generateImage(text);
      setGenerationResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Resto del código...

  return (
    <div className="app">
      <h1>Aplicación de Generación de Imágenes</h1>
      {warning && <p className="warning">{warning}</p>}
      {/* Resto del código... */}
    </div>
  );
}

export default App;


name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy to Azure Static Web Apps
      uses: azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        action: 'upload'
        app_location: 'build'
        output_location: ''

git add .
git commit -m "Configurar secretos y modificar flujo de trabajo"
git push origin main
