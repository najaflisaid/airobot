import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, LogOut, Package, LayoutDashboard } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { LANGS } from "../../lib/i18n";
import { SITE } from "../../config";

const Header = () => {
  const { count } = useCart();
  const { user, profile, isAdmin, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: t("home"), to: "/" },
    { label: t("shop"), to: "/shop" },
    { label: t("about"), to: "/#care" },
    { label: t("faq"), to: "/#faq" },
  ];

  const LangSwitcher = ({ className = "" }) => (
    <div className={`flex items-center bg-white hard-border rounded-lg overflow-hidden ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-xs font-extrabold transition-colors ${lang === l.code ? "eggi-yellow" : "hover:bg-[#FCF7E8]"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );

  const handleLogout = async () => {
    await logout();
    setAcctOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3">
      <div className="eggi-container">
        <div
          className="flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 hard-border bg-white/85 backdrop-blur-md"
          style={{ boxShadow: "3px 3px 0 0 #1C1A17" }}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="eggi-yellow hard-border w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg">N</span>
            <span className="font-extrabold text-xl tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm font-semibold hover:text-[#F76D5E] transition-colors">
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-sm font-extrabold text-[#1C1A17] eggi-yellow hard-border px-3 py-1.5 rounded-lg hover:-translate-y-0.5 transition-transform">
                {t("admin")}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher className="hidden sm:flex" />
            <Link to="/cart" className="btn-brutal relative w-9 h-9 rounded-full eggi-yellow hard-border flex items-center justify-center" aria-label={t("cart")}>
              <ShoppingBag size={16} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F76D5E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center hard-border">
                  {count}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => (user ? setAcctOpen((v) => !v) : navigate("/login"))}
                className="btn-brutal w-9 h-9 rounded-full bg-white hard-border flex items-center justify-center"
                aria-label="Account"
              >
                <User size={16} />
              </button>
              {user && acctOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white hard-border rounded-xl p-2" style={{ boxShadow: "3px 3px 0 0 #1C1A17" }}>
                  <div className="px-3 py-2 border-b-2 border-[#1C1A17] mb-1">
                    <p className="text-xs text-[#8a8377] font-semibold">{t("signed_in_as")}</p>
                    <p className="text-sm font-bold truncate">{profile?.name || user.email}</p>
                  </div>
                  <Link to="/orders" onClick={() => setAcctOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#FCF7E8]">
                    <Package size={15} /> {t("my_orders")}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setAcctOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#FCF7E8]">
                      <LayoutDashboard size={15} /> {t("admin")}
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-[#d64545] hover:bg-[#FBD0CF]">
                    <LogOut size={15} /> {t("logout")}
                  </button>
                </div>
              )}
            </div>

            <button className="md:hidden w-9 h-9 rounded-full bg-white hard-border flex items-center justify-center" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 bg-white hard-border rounded-2xl p-4 flex flex-col gap-3" style={{ boxShadow: "3px 3px 0 0 #1C1A17" }}>
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setMenuOpen(false)} className="font-semibold">{l.label}</Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="font-extrabold text-[#1C1A17] eggi-yellow hard-border px-3 py-2 rounded-lg text-center">
                {t("admin")}
              </Link>
            )}
            {!user && (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="eggi-dark text-white font-bold px-4 py-2 rounded-xl hard-border text-center">{t("login_register")}</Link>
            )}
            <LangSwitcher className="self-start" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
