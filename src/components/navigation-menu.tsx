'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

interface NavigationMenuProps {
  sections: { id: string; label: string }[];
  showMenu?: boolean;
  isMenuVisible?: boolean;
  onMenuVisibleChange?: (visible: boolean) => void;
}

// SVG de banderas España y UK divididas
function FlagIcon({ lang }: { lang: string }) {
  // España a la izquierda, UK a la derecha
  return (
    <span className="inline-block w-6 h-4 align-middle">
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* España (izquierda) */}
        <rect x="0" y="0" width="12" height="16" fill="#C60B1E" />
        <rect x="0" y="4" width="12" height="8" fill="#FFC400" />
        {/* UK (derecha) */}
        <rect x="12" y="0" width="12" height="16" fill="#012169" />
        <path d="M12 0 L24 16 M24 0 L12 16" stroke="#FFF" strokeWidth="2" />
        <path d="M18 0 V16 M12 8 H24" stroke="#FFF" strokeWidth="4" />
        <path d="M12 0 L24 16 M24 0 L12 16" stroke="#C8102E" strokeWidth="1" />
        <path d="M18 0 V16 M12 8 H24" stroke="#C8102E" strokeWidth="2" />
      </svg>
    </span>
  );
}

export default function NavigationMenu({ sections, showMenu = true, isMenuVisible = true, onMenuVisibleChange }: NavigationMenuProps) {
  const { t, i18n: i18nextInstance } = useTranslation();
  // Log para depuración del idioma activo
  console.log('Idioma activo:', i18nextInstance.language);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [menuOpacity, setMenuOpacity] = useState<number>(0);
  const [menuTransform, setMenuTransform] = useState<string>('translateY(-100%)');

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar/ocultar menú según el scroll - aparece gradualmente desde el principio
      const heroSection = document.getElementById('hero');

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const scrollPosition = window.scrollY;

        // El menú aparece gradualmente al hacer scroll desde el principio
        const fadeProgress = Math.min(1, scrollPosition / 200); // Aparece completamente después de 200px de scroll

        setMenuOpacity(fadeProgress * 0.85);
        setMenuTransform(`translateY(${(1 - fadeProgress) * -30}px)`);

        // Actualizar visibilidad
        const shouldBeVisible = fadeProgress > 0;
        if (shouldBeVisible !== isVisible) {
          setIsTransitioning(true);
          setTimeout(() => {
            setIsVisible(shouldBeVisible);
            setIsTransitioning(false);
          }, 300);
        }
      }

      // Detectar sección activa con animación
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = '';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveSection = section.id;
            break;
          }
        }
      }

      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    // Usar throttling para mejor rendimiento
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Llamar inicialmente

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [sections, isVisible, activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 60; // Ajustado para el menú más pequeño

      // Añadir efecto de transición
      document.body.style.transition = 'all 0.3s ease';

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Limpiar transición después del scroll
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    }
  };

  // Botón para cambiar idioma
  const handleLanguageChange = () => {
    const newLang = i18nextInstance.language === 'es' ? 'en' : 'es';
    i18nextInstance.changeLanguage(newLang);
  };

  useEffect(() => {
    // Notificar al padre el estado de visibilidad del menú
    if (typeof onMenuVisibleChange === 'function') {
      onMenuVisibleChange(isVisible);
    }
  }, [isVisible, onMenuVisibleChange]);

  // Clases para animación de visibilidad del menú
  const menuAnimationClass = isMenuVisible
    ? 'opacity-100 translate-y-0 pointer-events-auto'
    : 'opacity-0 -translate-y-full pointer-events-none';

  // No renderizar si no es visible y no está en transición
  if (!isVisible && !isTransitioning) return null;
  if (!showMenu) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${menuAnimationClass} bg-black/60`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center h-12">
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 overflow-hidden group h-8 ${
                  activeSection === section.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-gray-900'
                }`}
              >
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform transition-all duration-300 ${
                  activeSection === section.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
                <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transform transition-all duration-300 ${
                  activeSection === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
                <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
                )}
              </Button>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <select
              onChange={(e) => scrollToSection(e.target.value)}
              value={activeSection}
              className="bg-black/50 border border-purple-500/30 text-white px-3 py-1 rounded-md text-sm transition-all duration-300 hover:border-cyan-400 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 h-8"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
           style={{ width: activeSection ? `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` : '0%' }} />
    </nav>
  );
}