import React from "react";
import { IMAGES } from "../mock";
import useInView from "../hooks/useInView";
import { useContent } from "../contexts/ContentContext";
import EditableText from "./EditableText";

export const Timeline = () => {
  const [ref, inView] = useInView();
  const { content } = useContent();
  const steps = content.timeline.steps;
  const pets = [IMAGES.robotFace, IMAGES.plushFox, IMAGES.robotAnimal, IMAGES.dogRobot, IMAGES.plushBear, IMAGES.robotGreenEyes];
  return (
    <section className="eggi-cream py-20 md:py-28">
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <EditableText as="p" path="timeline.label" className="section-label mb-4 text-coral block" />
            <EditableText as="h2" path="timeline.title" className="display-title text-4xl sm:text-6xl block" />
          </div>
          <EditableText as="p" path="timeline.note" className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2 block" />
        </div>
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 fade-up ${inView ? "in-view" : ""}`}>
          {steps.map((s, i) => (
            <div key={i} className="card-brutal bg-[#FCF7E8] hard-border rounded-2xl p-5 shadow-brutal-sm flex flex-col">
              <EditableText as="h3" path={`timeline.steps.${i}.day`} className="text-lg font-extrabold mb-3 block" />
              <EditableText as="p" path={`timeline.steps.${i}.text`} className="text-sm font-semibold text-[#5a534a] mb-5 flex-1 block" />
              <div className="w-14 h-14 rounded-xl overflow-hidden hard-border">
                <img src={pets[i]} alt="" className="w-full h-full object-cover" />
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
  const { content } = useContent();
  const steps = content.loop.steps;
  return (
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #F7F0DA 0%, #FCF7E8 100%)" }}>
      <div className="eggi-container">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12">
          <div>
            <EditableText as="p" path="loop.label" className="section-label mb-4 text-coral block" />
            <EditableText as="h2" path="loop.title" className="display-title text-4xl sm:text-6xl block" />
          </div>
          <EditableText as="p" path="loop.note" className="text-lg font-semibold text-[#5a534a] max-w-md lg:pb-2 block" />
        </div>
        <div ref={ref} className={`grid lg:grid-cols-2 gap-6 fade-up ${inView ? "in-view" : ""}`}>
          <div className="relative hard-border rounded-2xl overflow-hidden min-h-[420px] eggi-dark" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <img src={IMAGES.dogRobot} alt="NUVII loop" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 text-white p-5 rounded-xl hard-border" style={{ background: "rgba(28,26,23,0.92)" }}>
              <EditableText as="h4" path="loop.overlay.title" className="font-extrabold text-lg mb-1 block" />
              <EditableText as="p" path="loop.overlay.text" className="text-sm font-medium text-[#d9d3c6] block" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <div key={i} className="card-brutal bg-[#FCF7E8] hard-border rounded-2xl p-5 flex items-center gap-5 shadow-brutal-sm">
                <EditableText as="span" path={`loop.steps.${i}.num`} className="eggi-yellow hard-border w-11 h-11 shrink-0 rounded-lg flex items-center justify-center font-extrabold text-lg" />
                <div>
                  <EditableText as="h3" path={`loop.steps.${i}.title`} className="text-lg font-extrabold block" />
                  <EditableText as="p" path={`loop.steps.${i}.text`} className="text-sm font-medium text-[#5a534a] block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
