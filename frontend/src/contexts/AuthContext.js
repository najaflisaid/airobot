import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";
import { isAdminEmail } from "../config";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const ensureUserDoc = async (fbUser, extra = {}) => {
    const ref = doc(db, "users", fbUser.uid);
    const snap = await getDoc(ref);
    const role = isAdminEmail(fbUser.email) ? "admin" : "customer";
    if (!snap.exists()) {
      const data = {
        uid: fbUser.uid,
        email: fbUser.email,
        name: extra.name || fbUser.displayName || fbUser.email.split("@")[0],
        role,
        createdAt: Date.now(),
      };
      await setDoc(ref, data);
      return data;
    }
    const data = snap.data();
    // keep role in sync with admin list
    if (data.role !== role) {
      await setDoc(ref, { role }, { merge: true });
      data.role = role;
    }
    return data;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        try {
          const p = await ensureUserDoc(fbUser);
          setProfile(p);
        } catch (e) {
          setProfile({
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email,
            role: isAdminEmail(fbUser.email) ? "admin" : "customer",
          });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await ensureUserDoc(cred.user, { name });
    return cred.user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await ensureUserDoc(cred.user);
    return cred.user;
  };

  const logout = () => signOut(auth);

  const isAdmin = !!profile && profile.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, isAdmin, register, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
