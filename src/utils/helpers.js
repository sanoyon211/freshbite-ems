// ─────────────────────────────────────────────────────────────
// src/utils/helpers.js
// Shared helper functions & style maps
// ─────────────────────────────────────────────────────────────

/** Get first 2 initials from a full name */
export const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Department accent colour */
export const deptColor = (dept) => {
  const map = {
    "Kitchen Staff": "#f97316",
    Service: "#3b82f6",
    Management: "#a855f7",
    Delivery: "#06b6d4",
    Cashier: "#10b981",
    Cleaning: "#6b7280",
    Waiters: "#ec4899",
  };
  return map[dept] || "#6b7280";
};

/** Department background colour (translucent) */
export const deptBg = (dept) => {
  const map = {
    "Kitchen Staff": "rgba(249,115,22,0.15)",
    Service: "rgba(59,130,246,0.15)",
    Management: "rgba(168,85,247,0.15)",
    Delivery: "rgba(6,182,212,0.15)",
    Cashier: "rgba(16,185,129,0.15)",
    Cleaning: "rgba(107,114,128,0.15)",
    Waiters: "rgba(236,72,153,0.15)",
  };
  return map[dept] || "rgba(107,114,128,0.15)";
};

/** Tailwind-compatible dept badge class string */
export const DEPT_BADGE = {
  "Kitchen Staff":
    "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Service: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Management: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Delivery: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  Cashier: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Cleaning: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
  Waiters: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
};

/** Format number as BDT currency */
export const formatBDT = (amount) =>
  "৳" + Number(amount || 0).toLocaleString("en-BD");

/** Generate initial attendance grid for a month */
export const generateAttendance = (employees) => {
  const att = {};
  employees.forEach((e) => {
    att[e.id] = {};
    for (let d = 1; d <= 30; d++) {
      att[e.id][d] = d % 7 === 0 ? "A" : d % 11 === 0 ? "L" : "P";
    }
  });
  return att;
};

/** Status badge style helper */
export const statusStyle = (status) => {
  if (status === "Active" || status === "Approved" || status === "Paid")
    return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";
  if (status === "Inactive" || status === "Rejected")
    return "bg-red-500/15 text-red-400 border border-red-500/20";
  return "bg-amber-500/15 text-amber-400 border border-amber-500/20";
};

/** Leave type colour */
export const leaveTypeColor = (type) => {
  const map = {
    Sick: "bg-blue-500/15 text-blue-400",
    Annual: "bg-purple-500/15 text-purple-400",
    Emergency: "bg-red-500/15 text-red-400",
  };
  return map[type] || "bg-white/10 text-white/50";
};

/** Month names array */
export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const SHORT_MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];
