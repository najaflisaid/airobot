import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { IMAGES } from "../mock";
export const DEFAULT_CATEGORIES = [
  { slug: "ai-pet", name: "AI Pet" },
  { slug: "outfits", name: "Outfits" },
  { slug: "accessories", name: "Accessories" },
];

export const DEFAULT_PRODUCTS = [
  {
    slug: "nuvii-one",
    name: "NUVII ONE",
    tagline: "Your little AI friend.",
    description:
      "NUVII ONE is a pocket-sized AI companion you raise, dress up, and grow with. It reacts, gets hungry, moody and curious, unlocks skills and worlds, and becomes more personal every day.",
    price: 49,
    oldPrice: 69,
    category: "ai-pet",
    images: [IMAGES.heroDevice, IMAGES.robotFace, IMAGES.robotGreenEyes],
    stock: 500,
    featured: true,
    active: true,
  },
  {
    slug: "lamb-outfit",
    name: "Lamb Outfit",
    tagline: "Fluffy lamb look for your NUVII.",
    description: "A soft, cuddly lamb outfit that transforms your NUVII into an adorable little sheep.",
    price: 9.9,
    oldPrice: 15.9,
    category: "outfits",
    images: [IMAGES.plushBear],
    stock: 300,
    featured: true,
    active: true,
  },
  {
    slug: "fox-outfit",
    name: "Fox Outfit",
    tagline: "Sly little fox style.",
    description: "A playful fox outfit with pointy ears and a fluffy tail for your NUVII companion.",
    price: 9.9,
    oldPrice: 15.9,
    category: "outfits",
    images: [IMAGES.plushFox],
    stock: 300,
    featured: true,
    active: true,
  },
  {
    slug: "rabbit-outfit",
    name: "Rabbit Outfit",
    tagline: "Bouncy bunny vibes.",
    description: "A cute rabbit outfit with long floppy ears to give your NUVII a bunny makeover.",
    price: 9.9,
    oldPrice: 15.9,
    category: "outfits",
    images: [IMAGES.robotAnimal],
    stock: 300,
    featured: false,
    active: true,
  },
  {
    slug: "charging-dock",
    name: "Charging Dock",
    tagline: "Keep NUVII powered up.",
    description: "A sleek charging dock that keeps your NUVII ONE topped up and ready for daily check-ins.",
    price: 19,
    oldPrice: 0,
    category: "accessories",
    images: [IMAGES.dogRobot],
    stock: 200,
    featured: false,
    active: true,
  },
  {
    slug: "carry-pouch",
    name: "Carry Pouch",
    tagline: "Take NUVII everywhere.",
    description: "A cozy protective pouch so your NUVII can travel with you in bag, pocket, or backpack.",
    price: 12,
    oldPrice: 0,
    category: "accessories",
    images: [IMAGES.plushColorful],
    stock: 200,
    featured: false,
    active: true,
  },
];

// Seed Firestore with default data if empty. Best-effort (needs write access).
export const seedIfEmpty = async () => {
  try {
    const prodSnap = await getDocs(collection(db, "products"));
    if (!prodSnap.empty) return false;
    const batch = writeBatch(db);
    const now = Date.now();
    DEFAULT_CATEGORIES.forEach((c) => {
      const ref = doc(collection(db, "categories"));
      batch.set(ref, { ...c, createdAt: now });
    });
    DEFAULT_PRODUCTS.forEach((p, i) => {
      const ref = doc(collection(db, "products"));
      batch.set(ref, { ...p, createdAt: now + i });
    });
    await batch.commit();
    return true;
  } catch (e) {
    console.warn("Seed skipped:", e.message);
    return false;
  }
};

// Wipe products + categories and load NUVII defaults (admin action).
export const resetToNuvii = async () => {
  const prodSnap = await getDocs(collection(db, "products"));
  const catSnap = await getDocs(collection(db, "categories"));
  const delBatch = writeBatch(db);
  prodSnap.forEach((d) => delBatch.delete(d.ref));
  catSnap.forEach((d) => delBatch.delete(d.ref));
  await delBatch.commit();

  const batch = writeBatch(db);
  const now = Date.now();
  DEFAULT_CATEGORIES.forEach((c) => {
    const ref = doc(collection(db, "categories"));
    batch.set(ref, { ...c, createdAt: now });
  });
  DEFAULT_PRODUCTS.forEach((p, i) => {
    const ref = doc(collection(db, "products"));
    batch.set(ref, { ...p, createdAt: now + i });
  });
  await batch.commit();
  return true;
};
