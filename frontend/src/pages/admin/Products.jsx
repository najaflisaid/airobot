import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from "lucide-react";
import { fetchProducts, fetchCategories } from "../../lib/data";
import { createProduct, updateProduct, deleteProduct } from "../../lib/adminData";
import { uploadImage } from "../../lib/r2Storage";
import { toast } from "sonner";
import { SITE } from "../../config";

const empty = { name: "", slug: "", tagline: "", description: "", price: 0, oldPrice: 0, category: "", images: [], stock: 100, featured: false, active: true };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setProducts(await fetchProducts());
    setCategories(await fetchCategories());
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...empty, category: categories[0]?.slug || "" }); setOpen(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...empty, ...p }); setOpen(true); };

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const res = await uploadImage(file, "products");
        urls.push(res.url);
      }
      setForm((f) => ({ ...f, images: [...(f.images || []), ...urls] }));
      toast.success("Image(s) uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImg = (i) => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        price: Number(form.price),
        oldPrice: Number(form.oldPrice) || 0,
        stock: Number(form.stock) || 0,
      };
      if (editing) { await updateProduct(editing, data); toast.success("Product updated"); }
      else { await createProduct(data); toast.success("Product created"); }
      setOpen(false);
      await load();
    } catch (err) {
      toast.error("Could not save product");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    await deleteProduct(p.id);
    toast.success("Product deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="display-title text-4xl">Products</h1>
        <button onClick={openNew} className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-5 py-3 rounded-xl hard-border flex items-center gap-2"><Plus size={18} /> New product</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-2xl overflow-hidden" style={{ boxShadow: "4px 4px 0 0 #000" }}>
            <div className="h-40 border-b-2 border-[#1C1A17] bg-white"><img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div><h3 className="font-extrabold">{p.name}</h3><p className="text-sm font-bold">{SITE.currency}{p.price}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="btn-brutal bg-white w-9 h-9 rounded-lg hard-border flex items-center justify-center"><Pencil size={15} /></button>
                  <button onClick={() => remove(p)} className="btn-brutal bg-[#FBD0CF] w-9 h-9 rounded-lg hard-border flex items-center justify-center"><Trash2 size={15} /></button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {p.featured && <span className="text-[10px] font-extrabold px-2 py-0.5 rounded eggi-yellow hard-border">Featured</span>}
                {p.active === false && <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FBD0CF] hard-border">Hidden</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white text-[#1C1A17] hard-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" style={{ boxShadow: "6px 6px 0 0 #000" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b-2 border-[#1C1A17] sticky top-0 bg-white">
              <h2 className="font-extrabold text-xl">{editing ? "Edit product" : "New product"}</h2>
              <button onClick={() => setOpen(false)}><X size={22} /></button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <F label="Name"><input required value={form.name} onChange={set("name")} className="inp" /></F>
              <F label="Tagline"><input value={form.tagline} onChange={set("tagline")} className="inp" /></F>
              <F label="Description"><textarea value={form.description} onChange={set("description")} rows={3} className="inp" /></F>
              <div className="grid grid-cols-3 gap-4">
                <F label="Price"><input type="number" step="0.01" required value={form.price} onChange={set("price")} className="inp" /></F>
                <F label="Old price"><input type="number" step="0.01" value={form.oldPrice} onChange={set("oldPrice")} className="inp" /></F>
                <F label="Stock"><input type="number" value={form.stock} onChange={set("stock")} className="inp" /></F>
              </div>
              <F label="Category">
                <select value={form.category} onChange={set("category")} className="inp">
                  <option value="">Select...</option>
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </F>
              <F label="Images">
                <div className="flex flex-wrap gap-3 mb-3">
                  {form.images?.map((img, i) => (
                    <div key={i} className="relative w-20 h-20">
                      <img src={img} alt="" className="w-full h-full object-cover rounded-lg hard-border" />
                      <button type="button" onClick={() => removeImg(i)} className="absolute -top-2 -right-2 bg-[#F76D5E] text-white w-6 h-6 rounded-full hard-border flex items-center justify-center"><X size={12} /></button>
                    </div>
                  ))}
                </div>
                <label className="btn-brutal inline-flex items-center gap-2 bg-[#FCF7E8] font-bold px-4 py-2 rounded-xl hard-border cursor-pointer">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Upload image
                  <input type="file" accept="image/*" multiple hidden onChange={onUpload} disabled={uploading} />
                </label>
              </F>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 font-bold text-sm"><input type="checkbox" checked={form.featured} onChange={set("featured")} /> Featured</label>
                <label className="flex items-center gap-2 font-bold text-sm"><input type="checkbox" checked={form.active} onChange={set("active")} /> Active</label>
              </div>
              <button disabled={saving || uploading} type="submit" className="btn-brutal w-full eggi-dark text-white font-bold px-6 py-3.5 rounded-xl hard-border" style={{ boxShadow: "3px 3px 0 0 #FFD84D" }}>{saving ? "Saving..." : "Save product"}</button>
            </form>
          </div>
        </div>
      )}

      <style>{`.inp{width:100%;margin-top:4px;padding:10px 14px;border:2px solid #1C1A17;border-radius:12px;outline:none;font-weight:500;background:#fff}`}</style>
    </div>
  );
};

const F = ({ label, children }) => (
  <div><label className="text-sm font-bold">{label}</label>{children}</div>
);

export default AdminProducts;
