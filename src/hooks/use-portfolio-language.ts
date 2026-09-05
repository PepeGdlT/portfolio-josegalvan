"use client";

import { useTranslation } from "react-i18next";
import { useCallback, useSyncExternalStore } from "react";
import { getLanguage } from "@/data/portfolio";

export function usePortfolioLanguage() {
  const { i18n } = useTranslation();
  const subscribe = useCallback((notify: () => void) => {
    i18n.on("languageChanged", notify);
    return () => i18n.off("languageChanged", notify);
  }, [i18n]);
  const language = useSyncExternalStore(
    subscribe,
    () => getLanguage(i18n.language),
    () => getLanguage("en"),
  );

  return { i18n, language };
}
