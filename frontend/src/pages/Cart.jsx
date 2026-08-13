import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { SITE } from "../config";

const Cart = () => {
  const { items, updateQty, removeItem, subtotal, count } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="eggi-cream min-h-screen pt-32 pb-20">
        <div className="eggi-container text-center">
          <div className="w-20 h-20 mx-auto eggi-yellow hard-border rounded-2xl flex items-center justify-center mb-6"><ShoppingBag size={32} /></div>
          <h1 className="display-title text-4xl mb-3">Your cart is empty.</h1>
          <p className="text-[#7a7266] font-medium mb-6">Looks like you haven't added a NUVII yet.</p>
          <Link to="/shop" className="btn-brutal inline-block eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>Start shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="eggi-cream min-h-screen pt-28 md:pt-32 pb-20">
      <div className="eggi-container">
        <h1 className="display-title text-5xl mb-8">Your cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.id} className="bg-white hard-border rounded-2xl p-4 flex items-center gap-4 shadow-brutal-sm">
                <img src={i.image} alt={i.name} className="w-20 h-20 rounded-xl object-cover hard-border" />
                <div className="flex-1">
                  <h3 className="font-extrabold">{i.name}</h3>
                  <p className="text-sm text-[#7a7266] font-semibold">{SITE.currency}{i.price}</p>
                </div>
                <div className="flex items-center bg-[#FCF7E8] hard-border rounded-xl overflow-hidden">
                  <button onClick={() => updateQty(i.id, i.qty - 1)} className="px-2.5 py-2"><Minus size={14} /></button>
                  <span className="px-3 font-bold text-sm">{i.qty}</span>
                  <button onClick={() => updateQty(i.id, i.qty + 1)} className="px-2.5 py-2"><Plus size={14} /></button>
                </div>
                <div className="w-20 text-right font-extrabold">{SITE.currency}{(i.price * i.qty).toFixed(2)}</div>
                <button onClick={() => removeItem(i.id)} className="text-[#d64545] p-2"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>

          <div className="bg-white hard-border rounded-2xl p-6 h-fit" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <h2 className="font-extrabold text-xl mb-4">Order summary</h2>
            <div className="space-y-2 text-sm font-semibold">
              <div className="flex justify-between"><span className="text-[#7a7266]">Subtotal</span><span>{SITE.currency}{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-[#7a7266]">Shipping</span><span className="text-[#2f8f5b]">Free</span></div>
            </div>
            <div className="border-t-2 border-[#1C1A17] mt-4 pt-4 flex justify-between font-extrabold text-lg">
              <span>Total</span><span>{SITE.currency}{total.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate("/checkout")} className="btn-brutal w-full mt-6 eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>Checkout</button>
            <Link to="/shop" className="block text-center mt-3 text-sm font-bold underline">Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
