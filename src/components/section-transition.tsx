'use client';

import { useEffect, useState, useRef } from 'react';

interface SectionTransitionProps {
  activeSection: string;
  sections: { id: string; label: string }[];
}

export default function SectionTransition({ activeSection, sections }: SectionTransitionProps) {
  const [previousSection, setPreviousSection] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (activeSection && activeSection !== previousSection) {
      setIsTransitioning(true);
      setTransitionProgress(0);
      
      // Animación de transición optimizada
      const startTime = performance.now();
      const duration = 600; // Reducido para mejor rendimiento
      
      const animate = (currentTime: number) => {
        if (!lastUpdateRef.current) lastUpdateRef.current = currentTime;
        
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing function más suave
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        setTransitionProgress(easeProgress);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsTransitioning(false);
          setPreviousSection(activeSection);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeSection, previousSection]);

  if (!isTransitioning) return null;

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const previousIndex = sections.findIndex(s => s.id === previousSection);
  
  // Calcular colores basados en la sección (optimizado)
  const getSectionColor = (index: number) => {
    const colors = [
      'from-cyan-500 to-blue-600',    // Inicio
      'from-purple-500 to-pink-600',   // Sobre Mí
      'from-green-500 to-emerald-600', // Experiencia
      'from-blue-500 to-indigo-600',   // Proyectos
      'from-yellow-500 to-orange-600', // Certificaciones
      'from-red-500 to-rose-600'      // Contacto
    ];
    return colors[Math.max(0, Math.min(index, colors.length - 1))];
  };

  const currentColor = getSectionColor(currentIndex);

  return (
    <>
      {/* Efecto de pulso optimizado */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(34, 211, 238, ${0.05 * (1 - transitionProgress)}) 0%, 
            transparent 50%)`,
          opacity: transitionProgress < 0.5 ? transitionProgress * 2 : (1 - transitionProgress) * 2,
          willChange: 'opacity'
        }}
      />
      
      {/* Efecto de línea de progreso lateral optimizado */}
      <div 
        className="fixed left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 z-40 pointer-events-none"
        style={{
          transform: `scaleY(${transitionProgress})`,
          transformOrigin: 'top',
          opacity: Math.min(transitionProgress * 2, 0.6),
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Partículas de transición reducidas para mejor rendimiento */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${10 + (i * 8)}%`,
              opacity: Math.sin(transitionProgress * Math.PI) * 0.6,
              transform: `translateY(${(1 - transitionProgress) * 50}px) scale(${0.5 + transitionProgress * 0.5})`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>
      
      {/* Indicador de sección cambiante */}
      <div className="fixed top-20 right-4 z-40 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-2 text-white text-sm font-mono">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 bg-gradient-to-r ${currentColor} rounded-full animate-pulse`} />
            <span>
              {sections.find(s => s.id === activeSection)?.label || ''}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}