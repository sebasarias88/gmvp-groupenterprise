"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Accordion } from "@/components/core/Accordion";
import { faqs } from "@/content/site";

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** FAQ list with instant, accent-insensitive search. */
export function FaqSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return faqs;
    return faqs.filter((f) => normalize(f.q + " " + f.a).includes(q));
  }, [query]);

  return (
    <div>
      <label className="relative mb-10 block">
        <span className="sr-only">Buscar en preguntas frecuentes</span>
        <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-stone" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca: dividendos, cuotas, título, recompra…"
          className="w-full rounded-full border border-line bg-coal py-5 pl-14 pr-6 text-champagne outline-none transition-colors placeholder:text-stone focus:border-gold"
        />
      </label>
      {results.length ? (
        <Accordion key={query} items={results} />
      ) : (
        <p className="py-10 text-sand">No encontramos resultados. Escríbenos y te respondemos personalmente.</p>
      )}
    </div>
  );
}
