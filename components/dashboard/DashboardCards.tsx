"use client";

interface DashboardCardsProps {
  cards: { label: string; value: string }[];
}

export default function DashboardCards({ cards }: DashboardCardsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
        >
          <div className="text-sm text-slate-400">{c.label}</div>
          <div className="mt-2 text-3xl font-bold text-white">{c.value}</div>
        </div>
      ))}
    </section>
  );
}
