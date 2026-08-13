import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../../lib/data";
import { updateOrderStatus, shortId } from "../../lib/orders";
import { ORDER_STATUSES, STATUS_META, SITE } from "../../config";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(null);

  const load = async () => setOrders(await fetchAllOrders());
  useEffect(() => { load(); }, []);

  const changeStatus = async (o, status) => {
    try {
      await updateOrderStatus(o.id, status, o.statusHistory);
      toast.success(`Order #${shortId(o.id)} \u2192 ${status}`);
      load();
    } catch {
      toast.error("Could not update status");
    }
  };

  return (
    <div>
      <h1 className="display-title text-4xl mb-8">Orders</h1>
      {orders.length === 0 ? (
        <p className="font-semibold text-[#a49d90]">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const m = STATUS_META[o.status] || STATUS_META.pending;
            return (
              <div key={o.id} className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-2xl overflow-hidden" style={{ boxShadow: "4px 4px 0 0 #000" }}>
                <div className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-extrabold">#{shortId(o.id)}</p>
                    <p className="text-sm font-semibold text-[#7a7266]">{o.userEmail} \u00b7 {new Date(o.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="font-extrabold">{SITE.currency}{o.total?.toFixed(2)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg hard-border" style={{ background: m.bg, color: m.color }}>{m.label}</span>
                    <select value={o.status} onChange={(e) => changeStatus(o, e.target.value)} className="px-3 py-2 rounded-lg hard-border font-bold text-sm bg-white outline-none">
                      {ORDER_STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => setOpen(open === o.id ? null : o.id)} className="font-bold text-sm underline">{open === o.id ? "Hide" : "Details"}</button>
                  </div>
                </div>
                {open === o.id && (
                  <div className="px-4 pb-4 border-t-2 border-[#1C1A17] pt-3 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-extrabold text-sm mb-2">Items</p>
                      {o.items?.map((i, idx) => <p key={idx} className="text-sm font-medium">{i.qty} \u00d7 {i.name} \u2014 {SITE.currency}{(i.price * i.qty).toFixed(2)}</p>)}
                    </div>
                    {o.shippingInfo && (
                      <div>
                        <p className="font-extrabold text-sm mb-2">Shipping</p>
                        <p className="text-sm font-medium">{o.shippingInfo.name} \u00b7 {o.shippingInfo.phone}</p>
                        <p className="text-sm font-medium">{o.shippingInfo.address}, {o.shippingInfo.city}, {o.shippingInfo.country}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
