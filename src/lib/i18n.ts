import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esTranslation from '../locales/es/translation.json';
import enTranslation from '../locales/en/translation.json';

const resources = {
  es: { translation: esTranslation },
  en: { translation: enTranslation },
};

const getDefaultLanguage = () => {
  // aquí intento pillar el idioma del navegador, si es español lo pongo
  if (typeof window !== 'undefined' && window.navigator) {
    const lang = window.navigator.language || (window.navigator.languages && window.navigator.languages[0]);
    if (lang && lang.toLowerCase().startsWith('es')) return 'es';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(), // idioma por defecto detectado (lo pillo del navegador)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
