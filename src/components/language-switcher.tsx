"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';

function FlagIcon() {
  // España a la izquierda, UK a la derecha
  return (
    <span className="inline-block w-7 h-5 align-middle">
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* España (izquierda) */}
        <rect x="0" y="0" width="14" height="20" fill="#C60B1E" />
        <rect x="0" y="5" width="14" height="10" fill="#FFC400" />
        {/* UK (derecha) */}
        <rect x="14" y="0" width="14" height="20" fill="#012169" />
        <path d="M14 0 L28 20 M28 0 L14 20" stroke="#FFF" strokeWidth="2" />
        <path d="M21 0 V20 M14 10 H28" stroke="#FFF" strokeWidth="4" />
        <path d="M14 0 L28 20 M28 0 L14 20" stroke="#C8102E" strokeWidth="1" />
        <path d="M21 0 V20 M14 10 H28" stroke="#C8102E" strokeWidth="2" />
      </svg>
    </span>
  );
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleLanguageChange = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang); // Persistir idioma en localStorage
  };

  // Cargar idioma desde localStorage al iniciar el componente
  React.useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return (
    <button
      onClick={handleLanguageChange}
      className="fixed top-2 right-4 z-[100] px-1 py-1 h-7 w-7 flex items-center justify-center border border-gradient-to-r from-yellow-400 via-red-400 to-blue-400 text-gray-700 bg-black/60 hover:bg-gray-200 hover:text-black transition-all duration-300 rounded shadow-lg"
      aria-label={i18n.language === 'es' ? 'Cambiar a inglés' : 'Cambiar a español'}
      type="button"
    >
      <FlagIcon />
    </button>
  );
}
