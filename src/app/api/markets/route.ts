import { NextResponse } from "next/server";

export const revalidate = 3600;

const PAIRS = ["USD", "EUR", "GBP", "MXN", "BRL", "CAD"] as const;

/**
 * Exchange rates against the Colombian peso, cached for one hour.
 * Source: open.er-api.com (free, no API key).
 */
export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/COP", { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("bad response");
    const json = (await res.json()) as { rates?: Record<string, number>; time_last_update_utc?: string };
    const rates = json.rates ?? {};
    const data = PAIRS.filter((c) => rates[c]).map((c) => ({ pair: `${c}/COP`, value: 1 / rates[c] }));
    return NextResponse.json({ ok: true, updated: json.time_last_update_utc ?? null, data });
  } catch {
    return NextResponse.json({ ok: false, data: [] });
  }
}
