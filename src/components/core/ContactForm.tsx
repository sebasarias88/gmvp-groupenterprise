"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form posting to /api/contact. When email delivery is not configured
 * it falls back to opening WhatsApp with the message prefilled.
 */
export function ContactForm({ whatsapp, className, privacyHref = "/privacidad" }: { whatsapp: string; className?: string; privacyHref?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
    };
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; fallback?: string };
      if (json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.fallback === "whatsapp") {
        const text = `Hola, soy ${payload.name}. ${payload.message} (Correo: ${payload.email}${payload.phone ? `, Tel: ${payload.phone}` : ""})`;
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        setStatus("sent");
        form.reset();
        return;
      }
      setError(json.error ?? "No pudimos enviar tu mensaje.");
      setStatus("error");
    } catch {
      setError("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.");
      setStatus("error");
    }
  }

  const field =
    "peer w-full rounded-2xl border border-[var(--line)] bg-transparent px-5 pb-3 pt-7 text-base text-[var(--fg)] outline-none transition-colors placeholder-transparent focus:border-[var(--accent)]";
  const label =
    "pointer-events-none absolute left-5 top-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.14em]";

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4", className)} noValidate={false}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <input id="cf-name" name="name" required placeholder="Nombre y apellidos" className={field} autoComplete="name" />
          <label htmlFor="cf-name" className={label}>Nombre y apellidos *</label>
        </div>
        <div className="relative">
          <input id="cf-email" name="email" type="email" required placeholder="Correo" className={field} autoComplete="email" />
          <label htmlFor="cf-email" className={label}>Correo electrónico *</label>
        </div>
      </div>
      <div className="relative">
        <input id="cf-phone" name="phone" type="tel" placeholder="Teléfono" className={field} autoComplete="tel" />
        <label htmlFor="cf-phone" className={label}>Teléfono / celular</label>
      </div>
      <div className="relative">
        <textarea id="cf-message" name="message" required rows={5} placeholder="Mensaje" className={cn(field, "resize-none")} />
        <label htmlFor="cf-message" className={label}>¿En qué podemos ayudarte? *</label>
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--accent)]" />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y la{" "}
          <a href={privacyHref} className="underline underline-offset-4 hover:text-[var(--fg)]">política de privacidad</a>.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--on-accent)] transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Enviar mensaje
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
        <AnimatePresence>
          {status === "sent" && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]" role="status">
              <Check className="h-4 w-4" /> ¡Gracias! Te contactaremos muy pronto.
            </motion.span>
          )}
          {status === "error" && error && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-red-400" role="alert">
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
