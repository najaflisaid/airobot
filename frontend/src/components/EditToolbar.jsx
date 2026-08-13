import React from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Eye, Pencil } from "lucide-react";
import { useContent } from "../contexts/ContentContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const EditToolbar = () => {
  const { editMode, setEditMode, save, dirty, saving } = useContent();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin || !editMode) return null;

  const handleSave = async () => {
    try {
      await save();
      toast.success("Content saved");
    } catch (e) {
      toast.error("Save failed: " + (e?.code || e?.message || "error"));
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-3 bg-white hard-border rounded-2xl px-4 py-3" style={{ boxShadow: "4px 4px 0 0 #1C1A17" }}>
      <span className="flex items-center gap-2 text-sm font-extrabold"><Pencil size={16} /> Edit mode{dirty ? " \u00b7 unsaved" : ""}</span>
      <button onClick={handleSave} disabled={saving} className="btn-brutal eggi-yellow text-[#1C1A17] font-bold px-4 py-2 rounded-xl hard-border flex items-center gap-2">
        <Save size={15} /> {saving ? "Saving..." : "Save"}
      </button>
      <button onClick={() => { setEditMode(false); navigate("/admin"); }} className="btn-brutal bg-white font-bold px-4 py-2 rounded-xl hard-border flex items-center gap-2">
        <X size={15} /> Exit
      </button>
    </div>
  );
};

export const EditModeBanner = () => {
  const { editMode } = useContent();
  const { isAdmin } = useAuth();
  if (!isAdmin || !editMode) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[65] bg-[#F76D5E] text-white text-center text-xs font-extrabold py-1.5 flex items-center justify-center gap-2">
      <Eye size={13} /> LIVE EDITOR \u2013 click any text on the page to edit it
    </div>
  );
};

export default EditToolbar;
