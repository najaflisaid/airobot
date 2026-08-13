import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { SITE } from "../config";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const img = (product.images && product.images[0]) || "";
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const add = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.slug}`} className="card-brutal bg-white hard-border rounded-2xl overflow-hidden flex flex-col shadow-brutal-sm">
      <div className="relative h-52 overflow-hidden border-b-2 border-[#1C1A17] bg-[#f3eeda]">
        {img ? <img src={img} alt={product.name} className="w-full h-full object-cover" /> : null}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#F76D5E] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg hard-border">SALE</span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-lg leading-tight">{product.name}</h3>
        <p className="text-sm text-[#7a7266] font-medium mb-4 flex-1">{product.tagline}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {hasDiscount && <span className="text-sm text-[#a29a8c] line-through font-semibold">{SITE.currency}{product.oldPrice}</span>}
            <span className="text-xl font-extrabold">{SITE.currency}{product.price}</span>
          </div>
          <button onClick={add} className="btn-brutal eggi-dark text-white w-10 h-10 rounded-xl hard-border flex items-center justify-center" style={{ boxShadow: "2px 2px 0 0 #FFD84D" }} aria-label="Add to cart">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
