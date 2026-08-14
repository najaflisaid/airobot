import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Package, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchUserOrders } from "../lib/data";
import { shortId } from "../lib/orders";
import { ORDER_STATUSES, STATUS_META, SITE } from "../config";

const StatusBadge = ({ status, t }) => {
  const m = STATUS_META[status] || STATUS_META.pending;
  return <span className="text-xs font-extrabold px-3 py-1 rounded-lg hard-border" style={{ background: m.bg, color: m.color }}>{t("st_" + status) || m.label}</span>;
};

const Tracker = ({ status, t }) => {
  const idx = ORDER_STATUSES.findIndex((s) => s.key === status);
  const cur = idx === -1 ? (status === "cancelled" ? -1 : 0) : idx;
  return (
    <div className="flex items-center mt-4">
      {ORDER_STATUSES.map((s, i) => (
        <React.Fragment key={s.key}>
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full hard-border flex items-center justify-center text-[10px] font-extrabold ${i <= cur ? "eggi-yellow" : "bg-white"}`}>{i + 1}</div>
            <span className="text-[10px] font-bold mt-1 text-center w-14">{t("st_" + s.key)}</span>
          </div>
          {i < ORDER_STATUSES.length - 1 && <div className={`flex-1 h-1 mb-4 ${i < cur ? "bg-[#FFD84D]" : "bg-[#e5dfce]"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

const Orders = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [busy, setBusy] = useState(true);
  const [open, setOpen] = useState(null);
  const [params] = useSearchParams();
  const highlight = params.get("highlight");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const list = await fetchUserOrders(user.uid);
      setOrders(list);
      setBusy(false);
      if (highlight) setOpen(highlight);
    })();
  }, [user, highlight]);

  if (loading || busy) return <div className="pt-40 text-center font-bold">{t("loading")}</div>;

  if (orders.length === 0)
    return (
      <div className="eggi-cream min-h-screen pt-32 pb-20">
        <div className="eggi-container text-center">
          <div className="w-20 h-20 mx-auto eggi-yellow hard-border rounded-2xl flex items-center justify-center mb-6"><Package size={32} /></div>
          <h1 className="display-title text-4xl mb-3">{t("no_orders")}</h1>
          <Link to="/shop" className="btn-brutal inline-block eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>{t("start_shopping")}</Link>
        </div>
      </div>
    );

  return (
    <div className="eggi-cream min-h-screen pt-28 md:pt-32 pb-20">
      <div className="eggi-container max-w-4xl">
        <h1 className="display-title text-5xl mb-8">{t("orders_title")}</h1>
        <div className="space-y-5">
          {orders.map((o) => (
            <div key={o.id} className={`bg-white hard-border rounded-2xl overflow-hidden ${highlight === o.id ? "ring-2 ring-[#FFD84D]" : ""}`} style={{ boxShadow: "4px 4px 0 0 #1C1A17" }}>
              <button onClick={() => setOpen(open === o.id ? null : o.id)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <div>
                  <p className="font-extrabold">{t("order")} #{shortId(o.id)}</p>
                  <p className="text-sm text-[#7a7266] font-semibold">{new Date(o.createdAt).toLocaleDateString()} · {o.items?.length} {t("items")} · {SITE.currency}{o.total?.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3"><StatusBadge status={o.status} t={t} /><ChevronDown size={18} className={`transition-transform ${open === o.id ? "rotate-180" : ""}`} /></div>
              </button>
              {open === o.id && (
                <div className="px-5 pb-5 border-t-2 border-[#1C1A17] pt-4">
                  {o.status !== "cancelled" && <Tracker status={o.status} t={t} />}
                  <div className="mt-5 space-y-3">
                    {o.items?.map((i, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover hard-border" />
                        <div className="flex-1 text-sm"><p className="font-bold">{i.name}</p><p className="text-[#7a7266] font-semibold">x{i.qty}</p></div>
                        <span className="font-bold text-sm">{SITE.currency}{(i.price * i.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  {o.shippingInfo && (
                    <div className="mt-4 text-sm bg-[#FCF7E8] hard-border rounded-xl p-4">
                      <p className="font-extrabold mb-1">{t("ship_to")}</p>
                      <p className="font-medium text-[#4a443c]">{o.shippingInfo.name} · {o.shippingInfo.phone}</p>
                      <p className="font-medium text-[#4a443c]">{o.shippingInfo.address}, {o.shippingInfo.city}, {o.shippingInfo.country}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
