"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";

interface LanguageContextValue {
  lang: Lang;
  hi: boolean;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "dressly-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Read the saved language after mount so the server and first client render
  // both start from "en" (avoids a hydration mismatch).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, hi: lang === "hi", toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
