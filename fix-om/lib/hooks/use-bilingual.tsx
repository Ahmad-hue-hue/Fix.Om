"use client";

import { useState, useEffect, createContext, useContext } from "react";

type Language = "en" | "ar";

interface BilingualContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const BilingualContext = createContext<BilingualContextType | undefined>(undefined);

export function BilingualProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  
  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <BilingualContext.Provider value={{ language, isRTL, toggleLanguage, setLanguage }}>
      {children}
    </BilingualContext.Provider>
  );
}

export function useBilingual() {
  const context = useContext(BilingualContext);
  if (!context) {
    throw new Error("useBilingual must be used within BilingualProvider");
  }
  return context;
}