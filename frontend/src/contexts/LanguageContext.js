import React, { createContext, useContext, useEffect, useState } from "react";
import { ui, mapCountryToLang } from "../lib/i18n";

const LanguageContext = createContext(null);
export const useLanguage = () => useContext(LanguageContext);

const STORAGE_KEY = "nuvii_lang";

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => localStorage.getItem(STORAGE_KEY) || "en");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return; // user/auto choice already stored
    let cancelled = false;
    (async () => {
      const detect = async (url, field = "country_code") => {
        const r = await fetch(url);
        const d = await r.json();
        return d && (d[field] || d.countryCode || d.country);
      };
      try {
        let cc;
        try {
          cc = await detect("https://ipwho.is/");
        } catch (e) {
          cc = await detect("https://ipapi.co/json/");
        }
        if (!cancelled && cc) {
          const l = mapCountryToLang(cc);
          setLangState(l);
          localStorage.setItem(STORAGE_KEY, l);
        }
      } catch (e) {
        /* keep default en */
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key) => (ui[lang] && ui[lang][key]) || ui.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
