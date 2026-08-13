import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, Tags, ShoppingCart, Users, ArrowLeft } from "lucide-react";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Users },
];

const AdminLayout = () => (
  <div className="min-h-screen eggi-dark text-white flex">
    <aside className="w-64 shrink-0 border-r-2 border-[#3a352d] p-5 hidden md:flex flex-col">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <span className="eggi-yellow hard-border w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-lg text-[#1C1A17]">N</span>
        <span className="font-extrabold text-xl">NUVII Admin</span>
      </Link>
      <nav className="space-y-1 flex-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${isActive ? "eggi-yellow text-[#1C1A17]" : "text-[#d9d3c6] hover:bg-[#2a2620]"}`
            }
          >
            <it.icon size={18} /> {it.label}
          </NavLink>
        ))}
      </nav>
      <Link to="/" className="flex items-center gap-2 text-sm font-bold text-[#a49d90] hover:text-white mt-4"><ArrowLeft size={16} /> Back to store</Link>
    </aside>

    <div className="flex-1 min-w-0">
      {/* Mobile top nav */}
      <div className="md:hidden flex gap-2 overflow-x-auto p-4 border-b-2 border-[#3a352d]">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} end={it.end} className={({ isActive }) => `whitespace-nowrap px-3 py-2 rounded-lg font-bold text-xs ${isActive ? "eggi-yellow text-[#1C1A17]" : "bg-[#2a2620] text-[#d9d3c6]"}`}>{it.label}</NavLink>
        ))}
      </div>
      <div className="p-5 md:p-8">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AdminLayout;
