// Mock content data for NUVII clone (frontend-only)

export const IMAGES = {
  heroDevice: "https://images.unsplash.com/photo-1686386084459-8d9d14400a4b",
  robotFace: "https://images.unsplash.com/photo-1657642119697-6a70dc74c03d",
  robotAnimal: "https://images.unsplash.com/photo-1767716134877-82b74809e431",
  robotGreenEyes: "https://images.unsplash.com/photo-1646457633886-06ad0aeaa2bb",
  dogRobot: "https://images.unsplash.com/photo-1559715541-d4fc97b8d6dd",
  plushFox: "https://images.unsplash.com/photo-1783019189298-59fe81b6c488",
  plushBear: "https://images.unsplash.com/photo-1622473541183-ddae2b015b9d",
  plushColorful: "https://images.unsplash.com/photo-1584155828260-3791b07e6afb",
};

export const NAV_LINKS = [
  { label: "Care", href: "#care" },
  { label: "Growth", href: "#growth" },
  { label: "Play", href: "#play" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  badge: "NUVII ONE \u00b7 AI PET PREORDER",
  title: "NUVII",
  subtitle: "Your little AI friend.",
  description: "A tiny AI pet that reacts, dresses up, unlocks worlds, and grows with you.",
  primaryCta: "Pre-order for $49",
  secondaryCta: "See how it grows",
  cards: [
    { title: "100-day growth", text: "Personality, outfits, maps, and skills keep changing." },
    { title: "Device-first", text: "A pocket companion for daily check-ins." },
    { title: "Collectible", text: "Dress it up, unlock rare moments, and make it yours." },
  ],
};

export const WHAT_IS = {
  label: "WHAT IS NUVII",
  title: "Not another chatbot. A tiny life you raise.",
  note: "NUVII gets hungry, messy, clingy, moody, curious, and a little funnier every time you come back.",
  cards: [
    { tag: "No", title: "Not just a talking toy", text: "Conversation is only one layer. Care, routine, memory, and growth drive the relationship.", highlight: false },
    { tag: "No", title: "Not a story machine", text: "Stories, music, and drawings unlock as skills, not as the whole product.", highlight: false },
    { tag: "No", title: "Not homework in disguise", text: "NUVII is built around cute reactions, outfits, tiny needs, and daily surprises.", highlight: false },
    { tag: "Yes", title: "A companion that grows", text: "The more you care, the more NUVII feels like yours.", highlight: true },
  ],
};

export const DAILY = {
  label: "DAILY PET MOMENTS",
  title: "Tap, feed, clean, comfort, repeat.",
  note: "The fun is in the tiny signals: a hungry face, a messy mood, a weird sound, a new reaction, a look you want to screenshot.",
  cards: [
    { num: "01", title: "Feed it", text: "A tiny hungry face is hard to ignore.", color: "eggi-pastel-yellow" },
    { num: "02", title: "Clean it", text: "Clean it up and watch the mood flip.", color: "eggi-mint" },
    { num: "03", title: "Comfort it", text: "It sulks, wiggles, cheers up, and asks for you in its own way.", color: "eggi-pink" },
    { num: "04", title: "Heal it", text: "Help it bounce back and unlock the next cute reaction.", color: "eggi-blue" },
  ],
};

export const COLLECTIBLE = {
  cards: [
    { title: "Collectible looks", text: "Fox, sheep, bunny, and more styles that make each NUVII feel different.", color: "eggi-mint" },
    { title: "Desk-pet energy", text: "A tiny companion for your desk, bag, shelf, photos, and daily check-ins.", color: "eggi-yellow" },
    { title: "Rare little moments", text: "Expressions, sounds, skills, diary bits, and map surprises unlock over time.", color: "eggi-pink" },
  ],
};

export const SKILLS = {
  label: "AI SKILLS AND WORLD",
  title: "AI skills unlock as the bond grows.",
  note: "NUVII does not start fully unlocked. It becomes stranger, cuter, and more capable as your bond grows.",
  cards: [
    { tag: "AI", title: "Creative tools", text: "AI drawing, AI music, stories, and a daily diary." },
    { tag: "Day", title: "Daily helpers", text: "Weather, alarms, timers, and small routines." },
    { tag: "Map", title: "World adventures", text: "Travel, secret places, jobs, and playful missions." },
    { tag: "Bond", title: "Memory and voice", text: "A companion designed to feel more personal over time." },
  ],
  gallery: "Explore, grow, earn",
};

export const PREORDER = {
  label: "FIRST BATCH PREORDER",
  title: "Be first to raise one.",
  description: "Preorder eggi AI Pet for $49 today. Regular price is $69, with first-batch shipping estimated for September 1, 2026.",
  badges: ["$49 preorder", "$69 regular", "Ships Sep 1, 2026"],
  primaryCta: "Pre-order for $49",
  secondaryCta: "See details",
};

export const TIMELINE = {
  label: "GROWTH TIMELINE",
  title: "It changes because you keep showing up.",
  note: "NUVII starts clumsy and needy, then slowly becomes weirder, cuter, more personal, and more fun to show off.",
  steps: [
    { day: "Day 1", text: "Clumsy, hungry, and full of nonsense sounds." },
    { day: "Day 7", text: "Starts using tiny reactions and playful expressions." },
    { day: "Day 21", text: "Begins to react to the voice it hears most." },
    { day: "Day 30", text: "Gets a little rebellious, self-directed, and funny." },
    { day: "Day 55", text: "Skills, outfits, and little surprises start stacking up." },
    { day: "Day 100+", text: "Personality, memory, and adventures deepen." },
  ],
};

export const LOOP = {
  label: "EGG COINS AND UNLOCKS",
  title: "A tiny loop that keeps pulling you back.",
  note: "Earn Egg Coins, pick a job, open the shop, grab a new look, and unlock more of NUVII's world.",
  overlay: { title: "Care, earn, unlock", text: "Every check-in can turn into coins, outfits, maps, or a new reaction." },
  steps: [
    { num: "1", title: "Check status", text: "Food, water, mood, health, coins, and level." },
    { num: "2", title: "Care and react", text: "Feed, clean, heal, and catch the tiny mood shifts." },
    { num: "3", title: "Earn Egg Coins", text: "Jobs, movement, challenges, and playful tasks." },
    { num: "4", title: "Shop and style", text: "Spend coins on looks, items, and little upgrades." },
    { num: "5", title: "Unlock more", text: "Skills, outfits, maps, adventures, and personality." },
  ],
};

export const FAQ = {
  label: "QUICK QUESTIONS",
  title: "What you need to know before raising one.",
  note: "Keep it simple: what it is, how it grows, what unlocks, and what the first batch includes.",
  items: [
    { q: "Is NUVII like Tamagotchi?", a: "Yes in spirit: a tiny pet you care for daily. NUVII adds AI reactions, voice memory, outfits, and worlds." },
    { q: "What do I actually do with it?", a: "Feed it, clean it, comfort it, earn coins, dress it up, unlock skills, and explore new places." },
    { q: "Can I customize it?", a: "Yes. The host has one color and one version for this preorder. Lamb, fox, and rabbit outfits are separate add-ons at $9.90 each during preorder, or $15.90 standalone later." },
    { q: "What is in the first batch?", a: "The first batch includes eggi AI Pet at $49 preorder pricing, estimated to ship September 1, 2026. Preorder shipping is included for supported launch countries." },
    { q: "Can I add outfits?", a: "Yes. Choose lamb, fox, or rabbit outfits as separate Shopify products." },
  ],
};

export const FOOTER = {
  cta: {
    title: "Join the first-batch list.",
    text: "Drop your email and NUVII will ping you when preorder details hatch.",
    placeholder: "you@example.com",
    button: "Notify me",
  },
  tagline: "A pocket-sized AI companion you raise, dress up, and grow with.",
  contact: { email: "hello@eggi.ai", note: "Preorder and support questions" },
  basics: ["FAQ", "Preorder details", "Back to top"],
};
