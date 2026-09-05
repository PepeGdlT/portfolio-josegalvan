"use client";

import { Languages } from "lucide-react";
import { useEffect } from "react";
import { copy } from "@/data/portfolio";
import { usePortfolioLanguage } from "@/hooks/use-portfolio-language";

export default function LanguageSwitcher() {
  const { i18n, language } = usePortfolioLanguage();
  const nextLanguage = language === "es" ? "en" : "es";

  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem("portfolio-language");
      if (storedLanguage === "es" || storedLanguage === "en") void i18n.changeLanguage(storedLanguage);
    } catch { /* The language switch also works when storage is unavailable. */ }
  }, [i18n]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = () => {
    try { window.localStorage.setItem("portfolio-language", nextLanguage); } catch { /* Storage is optional. */ }
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      className="language-switcher"
      type="button"
      onClick={changeLanguage}
      aria-label={copy[language].switchLanguage}
      title={copy[language].switchLanguage}
    >
      <Languages aria-hidden="true" size={16} />
      <span>{nextLanguage.toUpperCase()}</span>
    </button>
  );
}
