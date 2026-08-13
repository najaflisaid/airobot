import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users as UsersIcon, DollarSign } from "lucide-react";
import { fetchProducts, fetchAllOrders, fetchUsers } from "../../lib/data";
import { resetToNuvii } from "../../lib/seed";
import { shortId } from "../../lib/orders";
import { STATUS_META, SITE } from "../../config";
import { toast } from "sonner";

const Stat = ({ icon: Icon, label, value, bg }) => (
  <div className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-2xl p-5" style={{ boxShadow: "4px 4px 0 0 #000" }}>
    <div className="w-10 h-10 rounded-xl hard-border flex items-center justify-center mb-3" style={{ background: bg }}><Icon size={18} /></div>
    <p className="text-3xl font-extrabold">{value}</p>
    <p className="text-sm font-semibold text-[#7a7266]">{label}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recent, setRecent] = useState([]);
  const [resetting, setResetting] = useState(false);

  const load = async () => {
    const [products, orders, users] = await Promise.all([fetchProducts(), fetchAllOrders(), fetchUsers()]);
    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    setStats({ products: products.length, orders: orders.length, users: users.length, revenue });
    setRecent(orders.slice(0, 6));
  };

  useEffect(() => {
    load();
  }, []);

  const handleReset = async () => {
    if (!window.confirm("This will DELETE all current products & categories and load the NUVII demo catalog. Continue?")) return;
    setResetting(true);
    try {
      await resetToNuvii();
      toast.success("NUVII demo catalog loaded");
      await load();
    } catch (e) {
      toast.error("Reset failed: " + e.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="display-title text-4xl">Dashboard</h1>
        <button onClick={handleReset} disabled={resetting} className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-5 py-3 rounded-xl hard-border">
          {resetting ? "Loading..." : "Load NUVII demo data"}
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <Stat icon={DollarSign} label="Revenue" value={`${SITE.currency}${stats.revenue.toFixed(0)}`} bg="#B4ECD5" />
        <Stat icon={ShoppingCart} label="Orders" value={stats.orders} bg="#FFD84D" />
        <Stat icon={Package} label="Products" value={stats.products} bg="#B9E0F5" />
        <Stat icon={UsersIcon} label="Customers" value={stats.users} bg="#FBD0CF" />
      </div>

      <div className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-2xl p-6" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <h2 className="font-extrabold text-xl mb-4">Recent orders</h2>
        {recent.length === 0 ? (
          <p className="font-semibold text-[#7a7266]">No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {recent.map((o) => {
              const m = STATUS_META[o.status] || STATUS_META.pending;
              return (
                <div key={o.id} className="flex items-center justify-between gap-4 bg-white hard-border rounded-xl p-3">
                  <div><p className="font-bold text-sm">#{shortId(o.id)}</p><p className="text-xs text-[#7a7266] font-semibold">{o.userEmail}</p></div>
                  <span className="font-extrabold text-sm">{SITE.currency}{o.total?.toFixed(2)}</span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg hard-border" style={{ background: m.bg, color: m.color }}>{m.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
