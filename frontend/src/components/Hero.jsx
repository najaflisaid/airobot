import React from "react";
import { HERO, IMAGES } from "../mock";
import useInView from "../hooks/useInView";

const Hero = ({ onPreorder, onGrow }) => {
  const [ref, inView] = useInView();

  return (
    <section id="top" className="eggi-cream pt-28 md:pt-36 pb-0 relative overflow-hidden">
      <div className="eggi-container relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div ref={ref} className={`fade-up ${inView ? "in-view" : ""} relative z-10`}>
            <span className="eggi-mint hard-border inline-block text-xs font-extrabold tracking-widest px-3 py-1.5 rounded-lg mb-6">
              {HERO.badge}
            </span>
            <h1 className="display-title text-[26vw] leading-none sm:text-[120px] flex items-center">
              {HERO.title}
              <span className="cursor-blink h-[0.8em]" />
            </h1>
            <h2 className="display-title text-4xl sm:text-5xl mt-2 mb-5 max-w-md">
              {HERO.subtitle}
            </h2>
            <p className="text-lg text-[#5a534a] font-medium max-w-md mb-8">
              {HERO.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={onPreorder}
                className="btn-brutal eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border"
                style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}
              >
                {HERO.primaryCta}
              </button>
              <button
                onClick={onGrow}
                className="btn-brutal bg-white font-bold px-6 py-3.5 rounded-xl hard-border"
                style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}
              >
                {HERO.secondaryCta}
              </button>
            </div>

            {/* Feature mini cards */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
              {HERO.cards.map((c) => (
                <div key={c.title} className="card-brutal bg-white hard-border rounded-xl p-4 shadow-brutal-sm">
                  <h3 className="font-extrabold mb-1">{c.title}</h3>
                  <p className="text-sm text-[#5a534a] font-medium">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - device */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="absolute w-[420px] h-[420px] eggi-yellow rounded-full blur-3xl opacity-40" />
            <div className="relative z-10 float-anim">
              <img
                src={IMAGES.heroDevice}
                alt="EGGI AI pet device"
                className="w-[420px] h-[520px] object-cover rounded-[40px] hard-border"
                style={{ boxShadow: "8px 8px 0 0 #1C1A17" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="stripe-divider mt-16" />
    </section>
  );
};

export default Hero;
