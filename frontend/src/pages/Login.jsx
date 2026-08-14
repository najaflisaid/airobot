import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

const mapError = (code) => {
  const m = {
    "auth/invalid-credential": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/user-not-found": "No account with this email.",
    "auth/invalid-email": "Please enter a valid email.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
  };
  return m[code] || "Something went wrong. Please try again.";
};

const GoogleBtn = ({ onClick }) => (
  <button onClick={onClick} type="button" className="btn-brutal w-full bg-white font-bold px-4 py-3 rounded-xl hard-border flex items-center justify-center gap-2" style={{ boxShadow: "3px 3px 0 0 #B9E0F5" }}>
    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.48 14.97.5 12 .5A11 11 0 0 0 2.18 7.06L5.84 9.9C6.71 7.3 9.14 4.75 12 4.75z"/></svg>
    Continue with Google
  </button>
);

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(mapError(err.code));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome!");
      navigate("/");
    } catch (err) {
      toast.error(mapError(err.code));
    }
  };

  return (
    <div className="eggi-cream min-h-screen flex items-center justify-center px-4 pt-28 pb-16">
      <div className="w-full max-w-md bg-white hard-border rounded-3xl p-8" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="eggi-yellow hard-border w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-lg">N</span>
          <span className="font-extrabold text-xl">NUVII</span>
        </div>
        <h1 className="display-title text-3xl mb-1">{t("welcome_back")}</h1>
        <p className="text-[#7a7266] font-medium mb-6">{t("login_sub")}</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-bold">{t("email")}</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl hard-border outline-none font-medium" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-bold">{t("password")}</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl hard-border outline-none font-medium" placeholder="••••••" />
          </div>
          <button disabled={busy} type="submit" className="btn-brutal w-full eggi-dark text-white font-bold px-4 py-3 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
            {busy ? t("logging_in") : t("login_btn")}
          </button>
        </form>
        <div className="flex items-center gap-3 my-5">
          <div className="h-0.5 flex-1 bg-[#e5dfce]" /><span className="text-xs font-bold text-[#a29a8c]">{t("or")}</span><div className="h-0.5 flex-1 bg-[#e5dfce]" />
        </div>
        <GoogleBtn onClick={google} />
        <p className="text-sm font-medium text-center mt-6">
          {t("no_account")} <Link to="/register" className="font-bold underline">{t("create_one")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
