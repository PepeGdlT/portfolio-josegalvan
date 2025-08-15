'use client';

import { useEffect, useState } from 'react';
import AnimatedBackground from './animated-background';
import AnimatedText from './animated-text';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

function LoadingScreenInner() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particleStyles, setParticleStyles] = useState<Array<React.CSSProperties>>([]);
  // Array de claves de frases
  const fraseKeys = [
    'frase1', 'frase2', 'frase3', 'frase4', 'frase5',
    'frase6', 'frase7', 'frase8', 'frase9', 'frase10'
  ];
  const [quote, setQuote] = useState(t(fraseKeys[0]));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Generar estilos aleatorios para partículas decorativas solo en el cliente
    const styles = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${1 + Math.random() * 2}s`,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setParticleStyles(styles);

    // Seleccionar frase inspiradora aleatoria solo en el cliente
    const randomKey = fraseKeys[Math.floor(Math.random() * fraseKeys.length)];
    setQuote(t(randomKey));

    return () => clearInterval(timer);
  }, [t]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <AnimatedBackground />
      <div className="relative z-10 text-center space-y-8">
        {/* Logo animado */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 animate-ping"></div>
          <div className="absolute inset-0 w-40 h-40 mx-auto border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
        {/* Texto animado */}
        <AnimatedText
          text={quote}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          delay={200}
        />
        <AnimatedText
          text="Backend Developer & AI Engineer"
          className="text-lg md:text-xl text-gray-300 font-light"
          delay={400}
        />
        {/* Barra de progreso dinámica */}
        <div className="w-80 mx-auto space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>{`${t('cargar')}: ${quote}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent to-white opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${
                  progress > (i + 1) * 20 ? 'animate-pulse' : 'opacity-30'
                }`}
                style={{
                  animationDelay: `${i * 100}ms`,
                  boxShadow: progress > (i + 1) * 20 ? '0 0 10px rgba(56, 189, 248, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
        </div>
        {/* Mensaje motivacional */}
        <AnimatedText
          text="Preparando algo increíble..."
          className="text-sm text-gray-400 italic"
          delay={600}
        />
        {/* Partículas decorativas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"
              style={style}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const LoadingScreen = dynamic(() => Promise.resolve(LoadingScreenInner), { ssr: false });
export default LoadingScreen;
