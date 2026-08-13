import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchCategories } from "../lib/data";
import { seedIfEmpty } from "../lib/seed";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "all";
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    (async () => {
      let list = await fetchProducts();
      if (list.length === 0) {
        await seedIfEmpty();
        list = await fetchProducts();
      }
      setProducts(list.filter((p) => p.active !== false));
      setCategories(await fetchCategories());
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = active === "all" ? products : products.filter((p) => p.category === active);
    list = [...list];
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [products, active, sort]);

  const setCat = (slug) => {
    if (slug === "all") params.delete("category");
    else params.set("category", slug);
    setParams(params);
  };

  return (
    <div className="eggi-cream min-h-screen pt-28 md:pt-32 pb-20">
      <div className="eggi-container">
        <p className="section-label text-coral mb-3">NUVII SHOP</p>
        <h1 className="display-title text-5xl sm:text-6xl mb-8">Everything for your NUVII.</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCat("all")} className={`btn-brutal px-4 py-2 rounded-xl hard-border font-bold text-sm ${active === "all" ? "eggi-yellow" : "bg-white"}`}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.slug)} className={`btn-brutal px-4 py-2 rounded-xl hard-border font-bold text-sm ${active === c.slug ? "eggi-yellow" : "bg-white"}`}>{c.name}</button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-xl hard-border font-bold text-sm bg-white outline-none">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-80 bg-white/60 hard-border rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <p className="font-semibold text-[#7a7266]">No products found in this category.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
