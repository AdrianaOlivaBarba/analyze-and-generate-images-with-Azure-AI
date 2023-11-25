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
