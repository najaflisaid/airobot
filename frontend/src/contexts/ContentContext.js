import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { defaultContent, mergeDeep, getByPath, setByPath } from "../lib/content";

const ContentContext = createContext(null);
export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [editMode, setEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "content", "home"));
        if (snap.exists()) {
          setContent(mergeDeep(defaultContent, snap.data()));
        }
      } catch (e) {
        /* keep defaults */
      }
    })();
  }, []);

  const getValue = (path) => getByPath(content, path);

  const updateField = (path, value) => {
    setContent((c) => setByPath(c, path, value));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "content", "home"), content);
      setDirty(false);
      return true;
    } finally {
      setSaving(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{ content, getValue, updateField, editMode, setEditMode, save, dirty, saving }}
    >
      {children}
    </ContentContext.Provider>
  );
};
