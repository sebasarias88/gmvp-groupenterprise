"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/core/Marquee";

type Rate = { pair: string; value: number };

const FALLBACK = ["USD/COP", "EUR/COP", "GBP/COP", "MXN/COP", "BRL/COP", "CAD/COP"];

/** Live FX strip against the Colombian peso (replaces the old TradingView widget). */
export function MarketTicker() {
  const [rates, setRates] = useState<Rate[] | null>(null);

  useEffect(() => {
    fetch("/api/markets")
      .then((r) => r.json())
      .then((j: { ok: boolean; data: Rate[] }) => setRates(j.ok && j.data.length ? j.data : null))
      .catch(() => setRates(null));
  }, []);

  const items = rates ?? FALLBACK.map((pair) => ({ pair, value: NaN }));
  const fmt = (v: number) =>
    Number.isFinite(v) ? v.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—";

  return (
    <div className="border-y border-line bg-onyx/60 py-3 backdrop-blur" aria-label="Indicadores de mercado">
      <Marquee speed={45}>
        {[...items, ...items].map((r, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-stone">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {r.pair}
            <span className="text-champagne">{fmt(r.value)}</span>
          </span>
        ))}
        <span className="mx-8 font-mono text-xs uppercase tracking-[0.18em] text-gold">Tasas de referencia · actualización horaria</span>
      </Marquee>
    </div>
  );
}
