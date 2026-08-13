import React from "react";
import { IMAGES } from "../mock";
import useInView from "../hooks/useInView";
import { useContent } from "../contexts/ContentContext";
import EditableText from "./EditableText";

const SectionHead = ({ base, labelColor = "text-yellow-eggi", titleClass = "", dark = false }) => (
  <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
    <div>
      <EditableText as="p" path={`${base}.label`} className={`section-label mb-4 block ${labelColor}`} />
      <EditableText as="h2" path={`${base}.title`} className={`display-title text-4xl sm:text-6xl block ${titleClass}`} />
    </div>
    <EditableText as="p" path={`${base}.note`} className={`text-lg font-semibold ${dark ? "text-yellow-eggi" : "text-[#5a534a]"} max-w-md lg:justify-self-start lg:pb-2 block`} />
  </div>
);

export const WhatIsEggi = () => {
  const [ref, inView] = useInView();
  const { content } = useContent();
  const cards = content.whatIs.cards;
  return (
    <section id="care" className="eggi-dark text-white py-20 md:py-28">
      <div className="eggi-container">
        <SectionHead base="whatIs" dark titleClass="text-white" />
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${inView ? "in-view" : ""}`}>
          {cards.map((c, i) => (
            <div key={i} className={`card-brutal hard-border rounded-2xl p-6 shadow-brutal-sm ${c.highlight ? "eggi-yellow text-[#1C1A17]" : "bg-[#FCF7E8] text-[#1C1A17]"}`}>
              <EditableText as="span" path={`whatIs.cards.${i}.tag`} className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-6" />
              <EditableText as="h3" path={`whatIs.cards.${i}.title`} className="text-xl font-extrabold mb-3 leading-tight block" />
              <EditableText as="p" path={`whatIs.cards.${i}.text`} className="text-sm font-medium text-[#5a534a] block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DailyMoments = () => {
  const [ref, inView] = useInView();
  const { content } = useContent();
  const cards = content.daily.cards;
  return (
    <section id="play" className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #FBEBA6 0%, #FCF7E8 100%)" }}>
      <div className="eggi-container">
        <SectionHead base="daily" labelColor="text-coral" />
        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          <div className="relative hard-border rounded-2xl overflow-hidden min-h-[380px]" style={{ background: "linear-gradient(135deg, #FBE9A0, #B4ECD5)", boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <span className="absolute top-5 left-5 z-10 bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg">Care</span>
            <img src={IMAGES.robotFace} alt="NUVII reacting" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <div key={i} className={`card-brutal ${c.color} hard-border rounded-2xl p-6 shadow-brutal-sm`}>
                <EditableText as="span" path={`daily.cards.${i}.num`} className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-5" />
                <EditableText as="h3" path={`daily.cards.${i}.title`} className="text-xl font-extrabold mb-2 block" />
                <EditableText as="p" path={`daily.cards.${i}.text`} className="text-sm font-medium text-[#4a443c] block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Collectible = () => {
  const [ref, inView] = useInView();
  const { content } = useContent();
  const cards = content.collectible.cards;
  const imgs = [IMAGES.plushFox, IMAGES.dogRobot, IMAGES.robotAnimal];
  return (
    <section className="eggi-dark text-white py-20 md:py-28">
      <div className="eggi-container">
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          {cards.map((c, i) => (
            <div key={i} className={`card-brutal ${c.color} hard-border rounded-2xl overflow-hidden shadow-brutal-sm text-[#1C1A17]`}>
              <div className="h-40 overflow-hidden border-b-2 border-[#1C1A17]">
                <img src={imgs[i]} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <EditableText as="h3" path={`collectible.cards.${i}.title`} className="text-xl font-extrabold mb-2 block" />
                <EditableText as="p" path={`collectible.cards.${i}.text`} className="text-sm font-medium text-[#4a443c] block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
