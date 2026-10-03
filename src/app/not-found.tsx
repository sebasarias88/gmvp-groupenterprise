import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1400px] flex-col justify-center px-6 pt-32 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Error 404</p>
      <h1 className="mt-6 font-serif text-7xl leading-none text-champagne md:text-9xl">
        Esta página <em className="text-gold">no existe.</em>
      </h1>
      <p className="mt-6 max-w-md text-sand">Pero tu próxima inversión sí. Volvamos al inicio.</p>
      <Link href="/" className="mt-10 inline-flex w-fit rounded-full bg-gold px-7 py-4 font-bold text-onyx">Ir al inicio</Link>
    </section>
  );
}
