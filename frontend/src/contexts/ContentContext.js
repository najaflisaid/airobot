import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { mergeDeep, getByPath, setByPath } from "../lib/content";
import { contentDefaults } from "../lib/contentI18n";
import { useLanguage } from "./LanguageContext";

const ContentContext = createContext(null);
export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const { lang } = useLanguage();
  const base = contentDefaults[lang] || contentDefaults.en;
  const [content, setContent] = useState(base);
  const [editMode, setEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fallback = contentDefaults[lang] || contentDefaults.en;
      try {
        const snap = await getDoc(doc(db, "content", `home_${lang}`));
        if (!cancelled) {
          setContent(snap.exists() ? mergeDeep(fallback, snap.data()) : fallback);
        }
      } catch (e) {
        if (!cancelled) setContent(fallback);
      }
    })();
    return () => { cancelled = true; };
  }, [lang]);

  const getValue = (path) => getByPath(content, path);

  const updateField = (path, value) => {
    setContent((c) => setByPath(c, path, value));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "content", `home_${lang}`), content);
      setDirty(false);
      return true;
    } finally {
      setSaving(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{ content, getValue, updateField, editMode, setEditMode, save, dirty, saving, lang }}
    >
      {children}
    </ContentContext.Provider>
  );
};
