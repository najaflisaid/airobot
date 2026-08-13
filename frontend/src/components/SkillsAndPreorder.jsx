import React from "react";
import { IMAGES } from "../mock";
import useInView from "../hooks/useInView";
import { useContent } from "../contexts/ContentContext";
import EditableText from "./EditableText";

export const Skills = () => {
  const [ref, inView] = useInView();
  const { content } = useContent();
  const cards = content.skills.cards;
  return (
    <section id="growth" className="eggi-cream py-20 md:py-28">
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <EditableText as="p" path="skills.label" className="section-label mb-4 text-coral block" />
            <EditableText as="h2" path="skills.title" className="display-title text-4xl sm:text-6xl block" />
          </div>
          <EditableText as="p" path="skills.note" className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2 block" />
        </div>

        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <div key={i} className="card-brutal bg-[#F7F0DA] hard-border rounded-2xl p-6 shadow-brutal-sm">
                <EditableText as="span" path={`skills.cards.${i}.tag`} className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-5" />
                <EditableText as="h3" path={`skills.cards.${i}.title`} className="text-xl font-extrabold mb-2 block" />
                <EditableText as="p" path={`skills.cards.${i}.text`} className="text-sm font-medium text-[#5a534a] block" />
              </div>
            ))}
          </div>
          <div className="relative hard-border rounded-2xl overflow-hidden min-h-[360px] bg-[#e9e4d2]" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <img src={IMAGES.robotGreenEyes} alt="NUVII world" className="absolute inset-0 w-full h-full object-cover" />
            <EditableText as="span" path="skills.gallery" className="absolute top-6 right-6 eggi-dark text-white text-sm font-extrabold px-4 py-2 rounded-lg hard-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Preorder = ({ onPreorder }) => {
  const [ref, inView] = useInView();
  const { content, editMode } = useContent();
  const badges = content.preorder.badges;
  const guard = () => { if (!editMode) onPreorder && onPreorder(); };
  return (
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #FBEBA6 0%, #FBE0CF 100%)" }}>
      <div className="eggi-container">
        <div ref={ref} className={`grid lg:grid-cols-2 hard-border rounded-3xl overflow-hidden fade-up ${inView ? "in-view" : ""}`} style={{ boxShadow: "8px 8px 0 0 #1C1A17" }}>
          <div className="bg-[#FCF7E8] p-8 md:p-12">
            <EditableText as="p" path="preorder.label" className="section-label mb-4 text-coral block" />
            <EditableText as="h2" path="preorder.title" className="display-title text-5xl sm:text-6xl mb-5 block" />
            <EditableText as="p" path="preorder.description" className="text-lg font-medium text-[#5a534a] mb-6 max-w-md block" />
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map((b, i) => (
                <EditableText key={i} as="span" path={`preorder.badges.${i}`} className="eggi-yellow hard-border text-sm font-extrabold px-4 py-2 rounded-lg" />
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={guard} className="btn-brutal eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
                <EditableText as="span" path="preorder.primaryCta" />
              </button>
              <button onClick={guard} className="btn-brutal bg-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
                <EditableText as="span" path="preorder.secondaryCta" />
              </button>
            </div>
          </div>
          <div className="eggi-mint flex items-center justify-center p-10 min-h-[320px] relative border-t-2 lg:border-t-0 lg:border-l-2 border-[#1C1A17]">
            <img src={IMAGES.plushBear} alt="NUVII plush" className="w-64 h-64 object-cover rounded-full hard-border" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }} />
          </div>
        </div>
      </div>
    </section>
  );
};
