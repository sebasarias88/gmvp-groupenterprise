import { NextResponse } from "next/server";
import { site } from "@/content/site";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  company?: string; // honeypot
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Contact endpoint.
 * - If RESEND_API_KEY and CONTACT_TO_EMAIL are set, the message is emailed via Resend.
 * - Otherwise it answers with `fallback: "whatsapp"` so the client can open WhatsApp instead.
 */
export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  // Bots fill hidden fields; pretend success.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim().slice(0, 120);
  const email = (data.email ?? "").trim().slice(0, 160);
  const phone = (data.phone ?? "").trim().slice(0, 40);
  const message = (data.message ?? "").trim().slice(0, 4000);

  if (!name || !isEmail(email) || !message || !data.consent) {
    return NextResponse.json({ ok: false, error: "Revisa los campos obligatorios." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ ok: false, fallback: "whatsapp" }, { status: 200 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${site.shortName} <onboarding@resend.dev>`,
      to: [to],
      reply_to: email,
      subject: `Nuevo contacto web — ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || "—"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, fallback: "whatsapp" }, { status: 200 });
  }
  return NextResponse.json({ ok: true });
}
