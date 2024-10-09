import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si el sonido está sonando

  // Función para reproducir el sonido al pasar el cursor
  const playSound = () => {
    const audio = document.getElementById('hover-sound');
    audio.currentTime = 0; // Reinicia el audio
    audio.play(); // Reproduce el sonido
    setIsPlaying(true); // Cambia el estado a verdadero al iniciar el sonido

    // Cuando el audio termine, cambia el estado a falso
    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  // Función para detener el sonido
  const stopSound = () => {
    const audio = document.getElementById('hover-sound');
    audio.pause(); // Detiene el sonido
    setIsPlaying(false); // Cambia el estado a falso
  };

  return (
    <div>
      <button 
        className="custom-button" 
        onMouseEnter={playSound} // Reproduce el sonido al entrar
        onMouseLeave={stopSound} // Detiene el sonido al salir
      >
        <img 
          src={isPlaying ? 'image2.png' : 'image.png'} 
          alt="Botón" 
        />
      </button>
      <audio id="hover-sound" src="magic.mp3" preload="auto"></audio>
    </div>
  );
}

export default App;