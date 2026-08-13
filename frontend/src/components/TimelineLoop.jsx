import React from "react";
import { TIMELINE, LOOP, IMAGES } from "../mock";
import useInView from "../hooks/useInView";

export const Timeline = () => {
  const [ref, inView] = useInView();
  const pets = [IMAGES.robotFace, IMAGES.plushFox, IMAGES.robotAnimal, IMAGES.dogRobot, IMAGES.plushBear, IMAGES.robotGreenEyes];
  return (
    <section className="eggi-cream py-20 md:py-28">
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <p className="section-label mb-4 text-coral">{TIMELINE.label}</p>
            <h2 className="display-title text-4xl sm:text-6xl">{TIMELINE.title}</h2>
          </div>
          <p className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2">{TIMELINE.note}</p>
        </div>

        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 fade-up ${inView ? "in-view" : ""}`}>
          {TIMELINE.steps.map((s, i) => (
            <div key={s.day} className="card-brutal bg-[#FCF7E8] hard-border rounded-2xl p-5 shadow-brutal-sm flex flex-col">
              <h3 className="text-lg font-extrabold mb-3">{s.day}</h3>
              <p className="text-sm font-semibold text-[#5a534a] mb-5 flex-1">{s.text}</p>
              <div className="w-14 h-14 rounded-xl overflow-hidden hard-border">
                <img src={pets[i]} alt={s.day} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Loop = () => {
  const [ref, inView] = useInView();
  return (
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #F7F0DA 0%, #FCF7E8 100%)" }}>
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <p className="section-label mb-4 text-coral">{LOOP.label}</p>
            <h2 className="display-title text-4xl sm:text-6xl">{LOOP.title}</h2>
          </div>
          <p className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2">{LOOP.note}</p>
        </div>

        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          {/* Image with overlay */}
          <div className="relative hard-border rounded-2xl overflow-hidden min-h-[420px] eggi-dark" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <img src={IMAGES.dogRobot} alt="EGGI loop" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 eggi-dark/90 text-white p-5 rounded-xl hard-border" style={{ background: "rgba(28,26,23,0.92)" }}>
              <h4 className="font-extrabold text-lg mb-1">{LOOP.overlay.title}</h4>
              <p className="text-sm font-medium text-[#d9d3c6]">{LOOP.overlay.text}</p>
            </div>
          </div>
          {/* Steps list */}
          <div className="flex flex-col gap-4">
            {LOOP.steps.map((s) => (
              <div key={s.num} className="card-brutal bg-[#FCF7E8] hard-border rounded-2xl p-5 flex items-center gap-5 shadow-brutal-sm">
                <span className="eggi-yellow hard-border w-11 h-11 shrink-0 rounded-lg flex items-center justify-center font-extrabold text-lg">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="text-sm font-medium text-[#5a534a]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
