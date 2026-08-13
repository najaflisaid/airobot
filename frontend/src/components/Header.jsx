import React, { useState, useEffect } from "react";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../mock";

const Header = ({ onPreorder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3">
      <div className="eggi-container">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 hard-border transition-all duration-300 ${
            scrolled ? "bg-white/85 backdrop-blur-md" : "bg-white/60 backdrop-blur-sm"
          }`}
          style={{ boxShadow: "3px 3px 0 0 #1C1A17" }}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <span className="eggi-yellow hard-border w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg">
              E
            </span>
            <span className="font-extrabold text-xl tracking-tight">EGGI</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold text-[#1C1A17] hover:text-[#F76D5E] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPreorder}
              className="btn-brutal hidden sm:inline-flex eggi-dark text-white text-sm font-bold px-4 py-2 rounded-xl hard-border shadow-brutal-sm"
              style={{ boxShadow: "2px 2px 0 0 #FFD84D" }}
            >
              Pre-order
            </button>
            <button className="btn-brutal w-9 h-9 rounded-full bg-white hard-border flex items-center justify-center" aria-label="Account">
              <User size={16} />
            </button>
            <button className="btn-brutal w-9 h-9 rounded-full eggi-yellow hard-border flex items-center justify-center" aria-label="Cart">
              <ShoppingBag size={16} />
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-full bg-white hard-border flex items-center justify-center"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 bg-white hard-border rounded-2xl p-4 flex flex-col gap-3" style={{ boxShadow: "3px 3px 0 0 #1C1A17" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="font-semibold text-[#1C1A17]">
                {l.label}
              </a>
            ))}
            <button onClick={onPreorder} className="eggi-dark text-white font-bold px-4 py-2 rounded-xl hard-border mt-1">
              Pre-order
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
