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
    if (!snap.exists()) {
      const role = isAdminEmail(fbUser.email) ? "admin" : "customer";
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
    // Upgrade to admin if email is whitelisted, but NEVER downgrade a
    // role that was set manually in Firestore (e.g. admin promoted by hand).
    if (isAdminEmail(fbUser.email) && data.role !== "admin") {
      try {
        await setDoc(ref, { role: "admin" }, { merge: true });
      } catch (e) { /* ignore */ }
      data.role = "admin";
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
