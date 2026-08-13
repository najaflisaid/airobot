// NUVII site configuration
export const SITE = {
  name: "NUVII",
  trademark: "NUVII\u2122",
  tagline: "Your little AI friend.",
  productName: "NUVII ONE",
  email: "hello@nuvii.ai",
  currency: "$",
};

// Emails that get admin access. Change or add emails here.
export const ADMIN_EMAILS = ["admin@nuvii.ai"];

export const isAdminEmail = (email) =>
  !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());

// Order status pipeline for tracking
export const ORDER_STATUSES = [
  { key: "pending", label: "Pending" },
  { key: "paid", label: "Paid" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export const STATUS_META = {
  pending: { label: "Pending", color: "#F5C518", bg: "#FBE9A0" },
  paid: { label: "Paid", color: "#2f8f5b", bg: "#B4ECD5" },
  processing: { label: "Processing", color: "#2f6fbf", bg: "#B9E0F5" },
  shipped: { label: "Shipped", color: "#9a5cc4", bg: "#e3cdf5" },
  delivered: { label: "Delivered", color: "#2f8f5b", bg: "#B4ECD5" },
  cancelled: { label: "Cancelled", color: "#d64545", bg: "#FBD0CF" },
};
