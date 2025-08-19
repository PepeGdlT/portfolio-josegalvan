'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import AnimatedBackground from "./animated-background";
import WaveEffect from "./wave-effect";
import AnimatedText from "./animated-text";
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

interface HeroOptimizedProps {
  onScrollToSection: (sectionId: string) => void;
}

function HeroOptimizedInner({ onScrollToSection }: HeroOptimizedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [particleStyles, setParticleStyles] = useState<Array<React.CSSProperties>>([]);
  const [waveStyles, setWaveStyles] = useState<Array<React.CSSProperties>>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Mostrar el contenido principal inmediatamente
    setIsVisible(true);
    
    // Mostrar el avatar con un pequeño retraso para mejor percepción
    const avatarTimer = setTimeout(() => {
      setShowAvatar(true);
    }, 300);

    // Mostrar efectos adicionales después de la carga inicial
    const effectsTimer = setTimeout(() => {
      setShowEffects(true);
    }, 800);

    // Generar estilos aleatorios para partículas flotantes y ondas solo en el cliente
    setParticleStyles(Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
      opacity: 0.3 + Math.random() * 0.7
    })));
    setWaveStyles(Array.from({ length: 5 }, (_, i) => ({
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      width: `${100 + Math.random() * 200}px`,
      height: `${100 + Math.random() * 200}px`,
      animationDelay: `${i * 0.5}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    })));

    return () => {
      clearTimeout(avatarTimer);
      clearTimeout(effectsTimer);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Fondos dinámicos */}
      <div className="absolute inset-0">
        <AnimatedBackground />
        {showEffects && <WaveEffect />}
      </div>

      {/* Contenido principal - carga inmediatamente */}
      <div className={`max-w-4xl mx-auto text-center space-y-6 transition-all duration-1000 relative z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="space-y-4">
          <AnimatedText 
            text="José Galván de la Torre"
            className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            delay={100}
          />
          
          <AnimatedText 
            text="Backend Developer & AI Engineer" 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            delay={300}
          />
          
          {/* Botón de descarga de CV internacionalizado */}
          <div className="flex justify-center gap-4 pt-4">
            <a
              href={i18n.language === 'es' ? '/CV-JoseGalvan.pdf' : '/CV-JoseGalvan-en.pdf'}
              download
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-2 border-cyan-400/50 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 px-8 py-6"
              >
                {i18n.language === 'es' ? 'Descargar CV' : 'Download CV'}
              </Button>
            </a>
          </div>

          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30 shadow-2xl">
              Estudiante de Ingeniería Informática apasionado por el desarrollo backend a gran escala 
              y la inteligencia artificial. Construyendo soluciones innovadoras con tecnologías 
              de vanguardia y experiencia internacional.
            </p>
          </div>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Button 
            size="lg" 
            onClick={() => onScrollToSection('proyectos')}
            className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-2 border-cyan-400/50 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Ver Proyectos
            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => onScrollToSection('contacto')}
            className="text-lg px-8 py-6 bg-transparent border-2 border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Contactar
          </Button>
        </div>

        {/* Avatar - carga con retraso para mejor percepción */}
        <div className={`flex justify-center space-x-6 pt-8 transition-all duration-1000 ${
          showAvatar ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/50 mb-8 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 relative">
            <div className="w-full h-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">JG</span>
            </div>
            {/* Imagen real cargada lazy */}
            <img
              src="/avatar.jpg"
              alt="José Galván de la Torre"
              className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
            {/* Efecto de brillo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Iconos de redes sociales */}
        <div className={`flex justify-center space-x-6 pt-8 transition-all duration-1000 ${
          showAvatar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <a
            href="https://github.com/PepeGdlT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-white hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-cyan-500/20"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/jose-galvan-de-la-torre/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-purple-500/20"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href="mailto:pepegdlt02@gmail.com"
            className="text-pink-300 hover:text-white hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-pink-500/20"
          >
            <Mail className="h-8 w-8" />
          </a>
        </div>
      </div>

      {/* Efectos decorativos avanzados */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Partículas flotantes */}
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"
              style={style}
            />
          ))}
          {/* Efectos de onda adicionales */}
          {waveStyles.map((style, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-400/20 animate-pulse"
              style={style}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const HeroOptimized = dynamic(() => Promise.resolve(HeroOptimizedInner), { ssr: false });
export default HeroOptimized;
