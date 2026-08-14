import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { fetchProducts } from "../lib/data";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import { SITE } from "../config";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [all, setAll] = useState([]);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const list = await fetchProducts();
      setAll(list);
      setProduct(list.find((p) => p.slug === slug) || null);
      setLoading(false);
      setQty(1);
      setActiveImg(0);
      window.scrollTo(0, 0);
    })();
  }, [slug]);

  if (loading) return <div className="pt-40 text-center font-bold">Loading...</div>;
  if (!product)
    return (
      <div className="pt-40 pb-20 text-center">
        <p className="font-bold text-xl mb-4">Product not found.</p>
        <Link to="/shop" className="underline font-bold">Back to shop</Link>
      </div>
    );

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const related = all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const add = () => {
    addItem(product, qty);
    toast.success(`${qty} \u00d7 ${product.name} added to cart`);
  };
  const buyNow = () => {
    addItem(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="eggi-cream min-h-screen pt-28 md:pt-32 pb-20">
      <div className="eggi-container">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold mb-6 hover:text-[#F76D5E]">
          <ArrowLeft size={18} /> {t("back")}
        </button>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="bg-white hard-border rounded-2xl overflow-hidden h-[420px]" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
              <img src={product.images?.[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 rounded-xl overflow-hidden hard-border ${activeImg === i ? "ring-2 ring-[#FFD84D]" : ""}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="eggi-mint hard-border inline-block text-xs font-extrabold tracking-widest px-3 py-1.5 rounded-lg mb-4 uppercase">{product.category?.replace("-", " ")}</span>
            <h1 className="display-title text-4xl sm:text-5xl mb-2">{product.name}</h1>
            <p className="text-lg text-[#7a7266] font-medium mb-5">{product.tagline}</p>
            <div className="flex items-baseline gap-3 mb-6">
              {hasDiscount && <span className="text-xl text-[#a29a8c] line-through font-semibold">{SITE.currency}{product.oldPrice}</span>}
              <span className="text-4xl font-extrabold">{SITE.currency}{product.price}</span>
            </div>
            <p className="text-[#4a443c] font-medium leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-white hard-border rounded-xl overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-3"><Minus size={16} /></button>
                <span className="px-4 font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-3"><Plus size={16} /></button>
              </div>
              <span className="text-sm font-semibold text-[#2f8f5b] flex items-center gap-1"><Check size={16} /> {t("in_stock")}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={add} className="btn-brutal bg-white font-bold px-6 py-3.5 rounded-xl hard-border flex items-center gap-2" style={{ boxShadow: "3px 3px 0 0 #B4ECD5" }}>
                <ShoppingCart size={18} /> {t("add_to_cart")}
              </button>
              <button onClick={buyNow} className="btn-brutal eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
                {t("buy_now")}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="display-title text-3xl mb-8">{t("you_may_like")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
