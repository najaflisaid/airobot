import React, { useState } from "react";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { WhatIsEggi, DailyMoments, Collectible } from "./components/WhatAndDaily";
import { Skills, Preorder } from "./components/SkillsAndPreorder";
import { Timeline, Loop } from "./components/TimelineLoop";
import { Faq, Footer } from "./components/FaqFooter";

function App() {
  const [showBar, setShowBar] = useState(true);

  const handlePreorder = () => {
    toast.success("Added to your preorder cart!", {
      description: "eggi AI Pet · $49 · Ships Sep 1, 2026",
    });
  };

  const scrollToGrowth = () => {
    const el = document.getElementById("growth");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Header onPreorder={handlePreorder} />
      <Hero onPreorder={handlePreorder} onGrow={scrollToGrowth} />
      <WhatIsEggi />
      <DailyMoments />
      <Collectible />
      <Skills />
      <Preorder onPreorder={handlePreorder} />
      <Timeline />
      <Loop />
      <Faq />
      <Footer />

      {/* Floating pre-order bar */}
      {showBar && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={handlePreorder}
            className="btn-brutal eggi-dark text-white font-bold px-5 py-3 rounded-xl hard-border"
            style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}
          >
            Pre-order for $49
          </button>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
