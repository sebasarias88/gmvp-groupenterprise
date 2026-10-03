"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { investmentRules } from "@/content/invest";

/**
 * Interactive "investor route": the visitor picks how many shares and how to pay,
 * and sees the 60-month horizon with title, dividend and buyback milestones.
 * Amounts only appear when a share price is configured in content/invest.ts.
 */
export function InvestorSimulator() {
  const { minShares, maxShares, horizonMonths, dividendEveryMonths, firstDividendMonth, buybackFromMonth, sharePrice, installmentOptions } =
    investmentRules;
  const [shares, setShares] = useState(minShares);
  const [mode, setMode] = useState<"cash" | "installments">("cash");
  const [installments, setInstallments] = useState(installmentOptions[1] ?? installmentOptions[0]);

  const titleMonth = mode === "cash" ? 0 : installments;
  const dividendMonths = useMemo(() => {
    const start = Math.max(firstDividendMonth, titleMonth + 1);
    const list: number[] = [];
    for (let m = start; m <= horizonMonths; m += dividendEveryMonths) list.push(m);
    return list;
  }, [firstDividendMonth, titleMonth, horizonMonths, dividendEveryMonths]);

  const total = sharePrice ? shares * sharePrice : null;
  const money = (v: number) => v.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  const pct = (m: number) => `${(m / horizonMonths) * 100}%`;

  return (
    <div className="overflow-hidden rounded-[32px] border border-line bg-coal">
      <div className="grid lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-10 border-b border-line p-8 md:p-12 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="shares" className="font-mono text-xs uppercase tracking-[0.24em] text-stone">Acciones</label>
              <motion.span key={shares} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-6xl text-gold">
                {shares}
              </motion.span>
            </div>
            <input
              id="shares"
              type="range"
              min={minShares}
              max={maxShares}
              step={1}
              value={shares}
              onChange={(e) => setShares(Number(e.target.value))}
              className="mt-4 w-full accent-[var(--color-gold)]"
            />
            <div className="mt-2 flex justify-between font-mono text-xs text-stone">
              <span>Mín. {minShares}</span>
              <span>Máx. {maxShares}</span>
            </div>
          </div>

          <fieldset>
            <legend className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-stone">Forma de pago</legend>
            <div className="grid grid-cols-2 gap-2 rounded-full border border-line p-1">
              {(
                [
                  ["cash", "De contado"],
                  ["installments", "Por cuotas"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                  className={cn(
                    "relative rounded-full py-3 text-sm font-semibold transition-colors",
                    mode === value ? "text-onyx" : "text-sand hover:text-champagne",
                  )}
                >
                  {mode === value && <motion.span layoutId="pay-pill" className="absolute inset-0 rounded-full bg-gold" />}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
            {mode === "installments" && (
              <div className="mt-4 flex flex-wrap gap-2">
                {installmentOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={installments === n}
                    onClick={() => setInstallments(n)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      installments === n ? "border-gold text-gold" : "border-line text-sand hover:border-stone",
                    )}
                  >
                    {n} cuotas
                  </button>
                ))}
              </div>
            )}
            <p className="mt-4 text-sm text-sand">
              {mode === "cash"
                ? "Pagar de contado te da descuentos en los servicios de las compañías del grupo."
                : "Recibes tu título al pagar la última cuota. Mensualmente te enviamos tu estado de cuenta."}
            </p>
          </fieldset>

          <div className="rounded-2xl border border-line p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-stone">Tu inversión</p>
            {total ? (
              <p className="mt-2 font-serif text-4xl text-champagne">{money(total)}</p>
            ) : (
              <p className="mt-2 text-champagne">Consulta el valor vigente por acción con un asesor.</p>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-stone">Tu horizonte · {horizonMonths} meses</p>

          <div className="relative mt-16 h-24">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <motion.div
              className="absolute left-0 top-1/2 h-px bg-gold"
              initial={false}
              animate={{ width: pct(titleMonth) }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute top-1/2 h-24 -translate-y-1/2 border-l border-dashed border-ruby/70" style={{ left: pct(buybackFromMonth) }}>
              <span className="absolute -top-7 left-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-ruby">Recompra posible</span>
            </div>
            {dividendMonths.map((m, i) => (
              <motion.span
                key={m}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow-[0_0_16px_rgba(241,214,122,0.8)]"
                style={{ left: pct(m) }}
                title={`Mes ${m}: dividendos`}
              />
            ))}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={{ left: pct(titleMonth) }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-[10px] font-bold text-onyx">T</span>
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs text-stone">
            <span>Mes 0</span>
            <span>Mes {horizonMonths}</span>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-onyx p-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-stone">Título</dt>
              <dd className="mt-2 font-serif text-3xl text-champagne">{titleMonth === 0 ? "Inmediato" : `Mes ${titleMonth}`}</dd>
            </div>
            <div className="bg-onyx p-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-stone">Pagos de dividendos*</dt>
              <dd className="mt-2 font-serif text-3xl text-champagne">{dividendMonths.length}</dd>
            </div>
            <div className="bg-onyx p-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-stone">Recompra desde</dt>
              <dd className="mt-2 font-serif text-3xl text-champagne">Mes {buybackFromMonth}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-stone">
            *Estimación ilustrativa: dividendos cada {dividendEveryMonths} meses una vez pagadas las acciones y cumplido el primer ciclo de año operacional. Los dividendos dependen de los resultados de la compañía; la recompra depende de su capacidad financiera y de la junta directiva.
          </p>
          <Link href="/contacto" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-bold text-onyx transition-colors hover:bg-gold-soft">
            Hablar con un asesor
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </div>
  );
}
