// components/common/Pill.tsx
"use client";
import React from "react";

export default function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?:
    | "default"
    | "green"
    | "yellow"
    | "yellow1"
    | "red"
    | "blue"
    | "emerald"
    | "orange"
    | "brown"
    | "purple"
    | "blue1"
    | "green1";
}) {
  const map: Record<string, string> = {
    default: "bg-slate-700/60 border-slate-600 text-white",
    green: "bg-emerald-900/60 border-emerald-700 text-emerald-50",
    yellow:
      "bg-[oklch(90.5%_0.182_98.111)] border-[oklch(94.5%_0.129_101.54)] text-black",
    red: "bg-rose-900/60 border-rose-700 text-rose-50",
    blue: "bg-blue-900/60 border-blue-700 text-blue-50",
    emerald:
      "bg-[oklch(96.2%_0.044_156.743)] border-[oklch(96.2%_0.044_156.743)] text-black",
    orange:
      "bg-[oklch(70.5%_0.213_47.604)] border-[oklch(70.5%_0.213_47.604)] text-black",
    yellow1:
      "bg-[oklch(85.2%_0.199_91.936)] border-[oklch(85.2%_0.199_91.936)] text-black",
    brown:
      "bg-[oklch(42.1%_0.095_57.708)] border-[oklch(42.1%_0.095_57.708)] text-white",
    purple:
      "bg-[oklch(51.8%_0.253_323.949)] border-[oklch(51.8%_0.253_323.949)] text-white",
    blue1:
      "bg-[oklch(74.6%_0.16_232.661)] border-[oklch(74.6%_0.16_232.661)] text-black",
    green1:
      "bg-[oklch(84.1%_0.238_128.85)] border-[oklch(84.1%_0.238_128.85)] text-black",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}
