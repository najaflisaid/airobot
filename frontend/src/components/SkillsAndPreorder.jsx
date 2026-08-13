import React from "react";
import { SKILLS, PREORDER, IMAGES } from "../mock";
import useInView from "../hooks/useInView";

export const Skills = () => {
  const [ref, inView] = useInView();
  return (
    <section id="growth" className="eggi-cream py-20 md:py-28">
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <p className="section-label mb-4 text-coral">{SKILLS.label}</p>
            <h2 className="display-title text-4xl sm:text-6xl">{SKILLS.title}</h2>
          </div>
          <p className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2">{SKILLS.note}</p>
        </div>

        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          <div className="grid sm:grid-cols-2 gap-5">
            {SKILLS.cards.map((c) => (
              <div key={c.title} className="card-brutal bg-[#F7F0DA] hard-border rounded-2xl p-6 shadow-brutal-sm">
                <span className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-5">
                  {c.tag}
                </span>
                <h3 className="text-xl font-extrabold mb-2">{c.title}</h3>
                <p className="text-sm font-medium text-[#5a534a]">{c.text}</p>
              </div>
            ))}
          </div>
          {/* Gallery */}
          <div
            className="relative hard-border rounded-2xl overflow-hidden min-h-[360px] bg-[#e9e4d2]"
            style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}
          >
            <img src={IMAGES.robotGreenEyes} alt="EGGI world" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute top-6 right-6 eggi-dark text-white text-sm font-extrabold px-4 py-2 rounded-lg hard-border" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
              {SKILLS.gallery}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Preorder = ({ onPreorder }) => {
  const [ref, inView] = useInView();
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #FBEBA6 0%, #FBE0CF 100%)" }}
    >
      <div className="eggi-container">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 hard-border rounded-3xl overflow-hidden fade-up ${inView ? "in-view" : ""}`}
          style={{ boxShadow: "8px 8px 0 0 #1C1A17" }}
        >
          <div className="bg-[#FCF7E8] p-8 md:p-12">
            <p className="section-label mb-4 text-coral">{PREORDER.label}</p>
            <h2 className="display-title text-5xl sm:text-6xl mb-5">{PREORDER.title}</h2>
            <p className="text-lg font-medium text-[#5a534a] mb-6 max-w-md">{PREORDER.description}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {PREORDER.badges.map((b) => (
                <span key={b} className="eggi-yellow hard-border text-sm font-extrabold px-4 py-2 rounded-lg">
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={onPreorder} className="btn-brutal eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
                {PREORDER.primaryCta}
              </button>
              <button onClick={onPreorder} className="btn-brutal bg-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
                {PREORDER.secondaryCta}
              </button>
            </div>
          </div>
          <div className="eggi-mint flex items-center justify-center p-10 min-h-[320px] relative border-t-2 lg:border-t-0 lg:border-l-2 border-[#1C1A17]">
            <img src={IMAGES.plushBear} alt="EGGI plush" className="w-64 h-64 object-cover rounded-full hard-border" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }} />
          </div>
        </div>
      </div>
    </section>
  );
};
