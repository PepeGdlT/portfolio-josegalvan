"use client";
import { useTranslation } from 'react-i18next';

function FlagIcon() {
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

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleLanguageChange = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };
  return (
    <button
      onClick={handleLanguageChange}
      className="fixed top-4 right-4 z-[100] px-2 py-1 h-8 w-8 flex items-center justify-center border border-cyan-400 text-cyan-400 bg-black/80 hover:bg-cyan-400 hover:text-black transition-all duration-300 rounded shadow-lg"
      aria-label={i18n.language === 'es' ? 'Cambiar a inglés' : 'Cambiar a español'}
      type="button"
    >
      <FlagIcon />
    </button>
  );
}

