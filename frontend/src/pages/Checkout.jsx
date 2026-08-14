import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { createOrder } from "../lib/orders";
import { toast } from "sonner";
import { SITE } from "../config";
import { useLanguage } from "../contexts/LanguageContext";

const Checkout = () => {
  const { items, subtotal, clearCart, count } = useCart();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: profile?.name || "",
    phone: "",
    address: "",
    city: "",
    country: "",
    card: "",
  });

  useEffect(() => {
    if (count === 0 && !busy) navigate("/shop");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (count === 0 && !busy) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const total = subtotal;

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to complete your order.");
      navigate("/login");
      return;
    }
    setBusy(true);
    try {
      // MOCK payment - no real charge
      await new Promise((r) => setTimeout(r, 1200));
      const order = await createOrder({
        userId: user.uid,
        userEmail: user.email,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image })),
        subtotal,
        shipping: 0,
        total,
        paymentMethod: "mock",
        shippingInfo: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          country: form.country,
        },
      });
      clearCart();
      toast.success("Payment successful! (Demo)");
      navigate(`/orders?highlight=${order.id}`);
    } catch (err) {
      console.error("ORDER_CREATE_ERROR", err && err.code, err && err.message);
      toast.error("Could not place order: " + (err?.code || err?.message || "unknown"));
      setBusy(false);
    }
  };

  return (
    <div className="eggi-cream min-h-screen pt-28 md:pt-32 pb-20">
      <div className="eggi-container">
        <h1 className="display-title text-5xl mb-2">{t("checkout_title")}</h1>
        <p className="text-[#7a7266] font-medium mb-8 flex items-center gap-2"><Lock size={15} /> {t("demo_note")}</p>
        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white hard-border rounded-2xl p-6 shadow-brutal-sm">
              <h2 className="font-extrabold text-xl mb-4">{t("shipping_details")}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("full_name")} value={form.name} onChange={set("name")} required />
                <Field label={t("phone")} value={form.phone} onChange={set("phone")} required />
                <div className="sm:col-span-2"><Field label={t("address")} value={form.address} onChange={set("address")} required /></div>
                <Field label={t("city")} value={form.city} onChange={set("city")} required />
                <Field label={t("country")} value={form.country} onChange={set("country")} required />
              </div>
            </div>
            <div className="bg-white hard-border rounded-2xl p-6 shadow-brutal-sm">
              <h2 className="font-extrabold text-xl mb-4 flex items-center gap-2"><CreditCard size={20} /> {t("payment_demo")}</h2>
              <Field label={t("card_number")} value={form.card} onChange={set("card")} placeholder="4242 4242 4242 4242" />
              <p className="text-xs text-[#a29a8c] font-semibold mt-2">{t("card_hint")}</p>
            </div>
          </div>

          <div className="bg-white hard-border rounded-2xl p-6 h-fit" style={{ boxShadow: "6px 6px 0 0 #1C1A17" }}>
            <h2 className="font-extrabold text-xl mb-4">{t("your_order")}</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-auto">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover hard-border" />
                  <div className="flex-1 text-sm"><p className="font-bold leading-tight">{i.name}</p><p className="text-[#7a7266] font-semibold">x{i.qty}</p></div>
                  <span className="font-bold text-sm">{SITE.currency}{(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-[#1C1A17] pt-4 flex justify-between font-extrabold text-lg">
              <span>{t("total")}</span><span>{SITE.currency}{total.toFixed(2)}</span>
            </div>
            <button disabled={busy} type="submit" className="btn-brutal w-full mt-6 eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>
              {busy ? t("processing") : `${t("pay")} ${SITE.currency}${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-bold">{label}</label>
    <input {...props} className="w-full mt-1 px-4 py-3 rounded-xl hard-border outline-none font-medium" />
  </div>
);

export default Checkout;
