import React from "react";
import { IMAGES } from "../mock";
import useInView from "../hooks/useInView";
import { useContent } from "../contexts/ContentContext";
import EditableText from "./EditableText";

const Hero = ({ onPreorder, onGrow }) => {
  const [ref, inView] = useInView();
  const { content, editMode } = useContent();
  const HERO = content.hero;
  const guard = (fn) => () => { if (!editMode) fn && fn(); };

  return (
    <section id="top" className="eggi-cream pt-28 md:pt-36 pb-0 relative overflow-hidden">
      <div className="eggi-container relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div ref={ref} className={`fade-up ${inView ? "in-view" : ""} relative z-10`}>
            <EditableText as="span" path="hero.badge" className="eggi-mint hard-border inline-block text-xs font-extrabold tracking-widest px-3 py-1.5 rounded-lg mb-6" />
            <h1 className="display-title text-[26vw] leading-none sm:text-[120px] flex items-center">
              <EditableText as="span" path="hero.title" />
              <span className="cursor-blink h-[0.8em]" />
            </h1>
            <EditableText as="h2" path="hero.subtitle" className="display-title text-4xl sm:text-5xl mt-2 mb-5 max-w-md block" />
            <EditableText as="p" path="hero.description" className="text-lg text-[#5a534a] font-medium max-w-md mb-8 block" />
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={guard(onPreorder)} className="btn-brutal eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
                <EditableText as="span" path="hero.primaryCta" />
              </button>
              <button onClick={guard(onGrow)} className="btn-brutal bg-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
                <EditableText as="span" path="hero.secondaryCta" />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
              {HERO.cards.map((c, i) => (
                <div key={i} className="card-brutal bg-white hard-border rounded-xl p-4 shadow-brutal-sm">
                  <EditableText as="h3" path={`hero.cards.${i}.title`} className="font-extrabold mb-1 block" />
                  <EditableText as="p" path={`hero.cards.${i}.text`} className="text-sm text-[#5a534a] font-medium block" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center">
            <div className="absolute w-[420px] h-[420px] eggi-yellow rounded-full blur-3xl opacity-40" />
            <div className="relative z-10 float-anim">
              <img src={IMAGES.heroDevice} alt="NUVII AI pet device" className="w-[420px] h-[520px] object-cover rounded-[40px] hard-border" style={{ boxShadow: "8px 8px 0 0 #1C1A17" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="stripe-divider mt-16" />
    </section>
  );
};

export default Hero;
