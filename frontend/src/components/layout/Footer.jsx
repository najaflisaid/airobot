import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SITE } from "../../config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Please enter a valid email address.");
    toast.success("You're on the first-batch list!", { description: "NUVII will ping you when preorder details hatch." });
    setEmail("");
  };
  return (
    <footer className="eggi-dark text-white pt-20 pb-10">
      <div className="eggi-container">
        <div
          className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl p-8 md:p-12 mb-16"
          style={{ background: "linear-gradient(135deg, #2a2620, #1C1A17)", border: "2px solid #FFD84D", boxShadow: "6px 6px 0 0 #F76D5E" }}
        >
          <div className="hidden lg:flex items-center gap-3">
            <span className="eggi-yellow hard-border w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xl text-[#1C1A17]">N</span>
            <span className="font-extrabold text-2xl">{SITE.name}</span>
          </div>
          <div>
            <h3 className="display-title text-3xl sm:text-4xl mb-2">Join the first-batch list.</h3>
            <p className="text-[#d9d3c6] font-medium mb-5">Drop your email and NUVII will ping you when preorder details hatch.</p>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 bg-white text-[#1C1A17] font-medium px-4 py-3 rounded-xl hard-border outline-none" />
              <button type="submit" className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-6 py-3 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #F76D5E" }}>Notify me</button>
            </form>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-8 border-t-2 border-[#3a352d] pt-10">
          <div>
            <h4 className="font-extrabold text-xl mb-2">{SITE.name}</h4>
            <p className="text-sm text-[#a49d90] font-medium max-w-xs">A pocket-sized AI companion you raise, dress up, and grow with.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-lg mb-2">Shop</h4>
            <ul className="space-y-1 text-sm font-semibold text-[#d9d3c6]">
              <li><Link to="/shop" className="hover:text-yellow-eggi">All products</Link></li>
              <li><Link to="/shop?category=ai-pet" className="hover:text-yellow-eggi">NUVII ONE</Link></li>
              <li><Link to="/shop?category=outfits" className="hover:text-yellow-eggi">Outfits</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-lg mb-2">Account</h4>
            <ul className="space-y-1 text-sm font-semibold text-[#d9d3c6]">
              <li><Link to="/orders" className="hover:text-yellow-eggi">My orders</Link></li>
              <li><Link to="/login" className="hover:text-yellow-eggi">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-lg mb-2">Contact</h4>
            <a href={`mailto:${SITE.email}`} className="text-sm text-yellow-eggi font-semibold underline">{SITE.email}</a>
          </div>
        </div>
        <p className="text-xs text-[#6b6558] font-medium mt-10">© 2026 {SITE.trademark}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
