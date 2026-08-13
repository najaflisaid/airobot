import React, { useState } from "react";
import { FAQ, FOOTER } from "../mock";
import useInView from "../hooks/useInView";
import { toast } from "sonner";

export const Faq = () => {
  const [ref, inView] = useInView();
  return (
    <section id="faq" className="eggi-cream py-20 md:py-28">
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <p className="section-label mb-4 text-coral">{FAQ.label}</p>
            <h2 className="display-title text-5xl sm:text-6xl">{FAQ.title}</h2>
          </div>
          <p className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2">{FAQ.note}</p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 gap-5 fade-up ${inView ? "in-view" : ""}`}>
          {FAQ.items.map((item) => (
            <div key={item.q} className="card-brutal bg-[#FCF7E8] hard-border rounded-2xl p-6 shadow-brutal-sm">
              <h3 className="text-xl font-extrabold mb-2">{item.q}</h3>
              <p className="text-sm font-medium text-[#5a534a] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're on the first-batch list!", { description: "EGGI will ping you when preorder details hatch." });
    setEmail("");
  };

  return (
    <footer className="eggi-dark text-white pt-20 pb-10">
      <div className="eggi-container">
        {/* CTA card */}
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-8 items-center rounded-3xl p-8 md:p-12 mb-16 fade-up ${inView ? "in-view" : ""}`}
          style={{ background: "linear-gradient(135deg, #2a2620, #1C1A17)", border: "2px solid #FFD84D", boxShadow: "6px 6px 0 0 #F76D5E" }}
        >
          <div className="hidden lg:flex items-center gap-3">
            <span className="eggi-yellow hard-border w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xl text-[#1C1A17]">E</span>
            <span className="font-extrabold text-2xl">EGGI</span>
          </div>
          <div>
            <h3 className="display-title text-3xl sm:text-4xl mb-2">{FOOTER.cta.title}</h3>
            <p className="text-[#d9d3c6] font-medium mb-5">{FOOTER.cta.text}</p>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={FOOTER.cta.placeholder}
                className="flex-1 bg-white text-[#1C1A17] font-medium px-4 py-3 rounded-xl hard-border outline-none"
              />
              <button type="submit" className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-6 py-3 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #F76D5E" }}>
                {FOOTER.cta.button}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom links */}
        <div className="grid sm:grid-cols-3 gap-8 border-t-2 border-[#3a352d] pt-10">
          <div>
            <h4 className="font-extrabold text-xl mb-2">EGGI</h4>
            <p className="text-sm text-[#a49d90] font-medium max-w-xs">{FOOTER.tagline}</p>
          </div>
          <div>
            <h4 className="font-extrabold text-lg mb-2">Contact</h4>
            <a href={`mailto:${FOOTER.contact.email}`} className="text-sm text-yellow-eggi font-semibold underline">{FOOTER.contact.email}</a>
            <p className="text-sm text-[#a49d90] font-medium mt-1">{FOOTER.contact.note}</p>
          </div>
          <div>
            <h4 className="font-extrabold text-lg mb-2">Basics</h4>
            <ul className="space-y-1">
              {FOOTER.basics.map((b) => (
                <li key={b}>
                  <a href="#top" className="text-sm text-[#d9d3c6] font-semibold underline hover:text-yellow-eggi transition-colors">{b}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-[#6b6558] font-medium mt-10">© 2026 EGGI. A preorder preview experience.</p>
      </div>
    </footer>
  );
};
