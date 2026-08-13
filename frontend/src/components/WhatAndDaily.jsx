import React from "react";
import { WHAT_IS, DAILY, COLLECTIBLE, IMAGES } from "../mock";
import useInView from "../hooks/useInView";

const SectionHead = ({ label, title, note, labelColor = "text-yellow-eggi", titleClass = "", dark = false }) => (
  <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
    <div>
      <p className={`section-label mb-4 ${labelColor}`}>{label}</p>
      <h2 className={`display-title text-4xl sm:text-6xl ${titleClass}`}>{title}</h2>
    </div>
    {note && (
      <p className={`text-lg font-semibold ${dark ? "text-yellow-eggi" : "text-[#5a534a]"} max-w-md lg:justify-self-start lg:pb-2`}>
        {note}
      </p>
    )}
  </div>
);

export const WhatIsEggi = () => {
  const [ref, inView] = useInView();
  return (
    <section id="care" className="eggi-dark text-white py-20 md:py-28">
      <div className="eggi-container">
        <SectionHead label={WHAT_IS.label} title={WHAT_IS.title} note={WHAT_IS.note} dark titleClass="text-white" />
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up ${inView ? "in-view" : ""}`}>
          {WHAT_IS.cards.map((c) => (
            <div
              key={c.title}
              className={`card-brutal hard-border rounded-2xl p-6 shadow-brutal-sm ${c.highlight ? "eggi-yellow text-[#1C1A17]" : "bg-[#FCF7E8] text-[#1C1A17]"}`}
            >
              <span className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-6">
                {c.tag}
              </span>
              <h3 className="text-xl font-extrabold mb-3 leading-tight">{c.title}</h3>
              <p className="text-sm font-medium text-[#5a534a]">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DailyMoments = () => {
  const [ref, inView] = useInView();
  return (
    <section
      id="play"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #FBEBA6 0%, #FCF7E8 100%)" }}
    >
      <div className="eggi-container">
        <SectionHead label={DAILY.label} title={DAILY.title} note={DAILY.note} labelColor="text-coral" />
        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          {/* Robot image card */}
          <div
            className="relative hard-border rounded-2xl overflow-hidden min-h-[380px]"
            style={{ background: "linear-gradient(135deg, #FBE9A0, #B4ECD5)", boxShadow: "6px 6px 0 0 #1C1A17" }}
          >
            <span className="absolute top-5 left-5 z-10 bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg">
              Care
            </span>
            <img src={IMAGES.robotFace} alt="EGGI reacting" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95" />
          </div>
          {/* Steps */}
          <div className="grid sm:grid-cols-2 gap-5">
            {DAILY.cards.map((c) => (
              <div key={c.num} className={`card-brutal ${c.color} hard-border rounded-2xl p-6 shadow-brutal-sm`}>
                <span className="inline-block bg-white hard-border text-sm font-extrabold px-3 py-1 rounded-lg mb-5">
                  {c.num}
                </span>
                <h3 className="text-xl font-extrabold mb-2">{c.title}</h3>
                <p className="text-sm font-medium text-[#4a443c]">{c.text}</p>
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
  const imgs = [IMAGES.plushFox, IMAGES.dogRobot, IMAGES.robotAnimal];
  return (
    <section className="eggi-dark text-white py-20 md:py-28">
      <div className="eggi-container">
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          {COLLECTIBLE.cards.map((c, i) => (
            <div key={c.title} className={`card-brutal ${c.color} hard-border rounded-2xl overflow-hidden shadow-brutal-sm text-[#1C1A17]`}>
              <div className="h-40 overflow-hidden border-b-2 border-[#1C1A17]">
                <img src={imgs[i]} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold mb-2">{c.title}</h3>
                <p className="text-sm font-medium text-[#4a443c]">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
