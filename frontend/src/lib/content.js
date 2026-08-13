import { HERO, WHAT_IS, DAILY, COLLECTIBLE, SKILLS, PREORDER, TIMELINE, LOOP, FAQ } from "../mock";

// Default editable site content for the home page.
// This mirrors the static copy and can be overridden via Firestore (content/home).
export const defaultContent = {
  hero: HERO,
  featured: { label: "SHOP NUVII", title: "Bring one home.", cta: "View all products" },
  whatIs: WHAT_IS,
  daily: DAILY,
  collectible: COLLECTIBLE,
  skills: SKILLS,
  preorder: PREORDER,
  timeline: TIMELINE,
  loop: LOOP,
  faq: FAQ,
};

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

// Deep-merge stored content over defaults so new fields always exist.
export const mergeDeep = (base, override) => {
  if (override == null) return base;
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (isObj(base)) {
    const out = { ...base };
    Object.keys(base).forEach((k) => {
      if (override[k] !== undefined) out[k] = mergeDeep(base[k], override[k]);
    });
    // include any extra keys present only in override
    Object.keys(override).forEach((k) => {
      if (out[k] === undefined) out[k] = override[k];
    });
    return out;
  }
  return override;
};

export const getByPath = (obj, path) =>
  path.split(".").reduce((a, k) => (a == null ? a : a[k]), obj);

export const setByPath = (obj, path, value) => {
  const keys = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const next = cur[k];
    cur[k] = Array.isArray(next) ? [...next] : { ...(next || {}) };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
};
