import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { fetchCategories, fetchProducts } from "../../lib/data";
import { createCategory, deleteCategory } from "../../lib/adminData";
import { toast } from "sonner";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});
  const [name, setName] = useState("");

  const load = async () => {
    const cats = await fetchCategories();
    setCategories(cats);
    const prods = await fetchProducts();
    const c = {};
    prods.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    setCounts(c);
  };
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await createCategory({ name: name.trim(), slug });
    setName("");
    toast.success("Category added");
    load();
  };
  const remove = async (c) => {
    if (!window.confirm(`Delete category "${c.name}"?`)) return;
    await deleteCategory(c.id);
    toast.success("Category deleted");
    load();
  };

  return (
    <div className="max-w-2xl">
      <h1 className="display-title text-4xl mb-8">Categories</h1>
      <form onSubmit={add} className="flex gap-3 mb-6">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" className="flex-1 px-4 py-3 rounded-xl hard-border outline-none font-medium text-[#1C1A17]" />
        <button type="submit" className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-5 py-3 rounded-xl hard-border flex items-center gap-2"><Plus size={18} /> Add</button>
      </form>
      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-xl p-4 flex items-center justify-between" style={{ boxShadow: "3px 3px 0 0 #000" }}>
            <div><p className="font-extrabold">{c.name}</p><p className="text-xs font-semibold text-[#7a7266]">{c.slug} \u00b7 {counts[c.slug] || 0} products</p></div>
            <button onClick={() => remove(c)} className="btn-brutal bg-[#FBD0CF] w-9 h-9 rounded-lg hard-border flex items-center justify-center"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
