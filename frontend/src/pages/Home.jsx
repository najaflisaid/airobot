import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { WhatIsEggi, DailyMoments, Collectible } from "../components/WhatAndDaily";
import { Skills, Preorder } from "../components/SkillsAndPreorder";
import { Timeline, Loop } from "../components/TimelineLoop";
import { Faq } from "../components/FaqFooter";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/data";
import { seedIfEmpty } from "../lib/seed";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let list = await fetchProducts();
      if (list.length === 0) {
        await seedIfEmpty();
        list = await fetchProducts();
      }
      setProducts(list.filter((p) => p.featured && p.active).slice(0, 4));
    })();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="eggi-cream py-20 md:py-24">
      <div className="eggi-container">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="section-label text-coral mb-3">SHOP NUVII</p>
            <h2 className="display-title text-4xl sm:text-5xl">Bring one home.</h2>
          </div>
          <button onClick={() => navigate("/shop")} className="btn-brutal bg-white font-bold px-6 py-3 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
            View all products
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const goShop = () => navigate("/shop");
  const scrollToGrowth = () => {
    const el = document.getElementById("growth");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onPreorder={goShop} onGrow={scrollToGrowth} />
      <FeaturedProducts />
      <WhatIsEggi />
      <DailyMoments />
      <Collectible />
      <Skills />
      <Preorder onPreorder={goShop} />
      <Timeline />
      <Loop />
      <Faq />
    </div>
  );
};

export default Home;
