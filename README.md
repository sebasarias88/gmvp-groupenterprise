# GMVP Group Enterprise

Sitio web de **gmvpgroupenterprise.com**, reconstruido desde cero con el contenido del sitio original.

Concepto visual: **Private Equity Luxury** — negro ónix, oro viejo, serif editorial (Instrument Serif + Manrope + JetBrains Mono).

## Lo que incluye

- Preloader con contador y cortina dorada (una vez por sesión)
- Hero con **skyline generativo en canvas** (ventanas que se encienden, parallax con el mouse y el scroll)
- **Ticker de divisas en vivo** contra el peso (`/api/markets`, cache 1 h) — reemplaza el widget de TradingView
- Manifiesto que se ilumina palabra por palabra con el scroll
- **Lema “Sueña · Crea · Avanza · Es posible” en scroll horizontal fijado**
- Tarjetas de compañías con tilt 3D y spotlight
- **Simulador de ruta del inversionista** (10–100 acciones, contado/cuotas, título, dividendos cada 4 meses, ventana de recompra)
- Línea de tiempo del fundador que se dibuja con el scroll
- FAQ con buscador sin tildes + JSON-LD FAQPage
- Transiciones de página, cursor magnético, footer con wordmark en parallax

**Páginas:** `/` · `/grupo` · `/portafolio` · `/fundador` · `/invertir` · `/contacto` · `/privacidad`

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (tokens de diseño en `src/app/globals.css`, bloque `@theme`)
- **GSAP + ScrollTrigger** (secciones fijadas, scroll horizontal, scrub), **Lenis** (smooth scroll) y **Motion** (Framer Motion) para microinteracciones
- Fuentes autoalojadas con **Fontsource** (sin dependencia de Google Fonts)
- `lucide-react` para iconos

## Arrancar

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build && yarn start
yarn lint
```

## Estructura

```
src/
  app/                  rutas (App Router), metadata, sitemap, robots, OG image, api/
  components/
    core/               animación y UI reutilizable (SmoothScroll, SplitHeading, ScrubText,
                        Reveal, Counter, Magnetic, TiltCard, Marquee, Cursor, Accordion,
                        ContactForm, WhatsAppButton…)
    layout/             Header, Footer, Logo, Preloader
    sections/           secciones de cada página
  content/              ⭐ TODOS los textos y datos del sitio (editar aquí)
  lib/                  utilidades (cn, gsap, intro, useMediaQuery)
```

## Formulario de contacto

`/api/contact` envía el correo con **Resend** si existen estas variables (ver `.env.example`):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=   # opcional, dominio verificado en Resend
```

Si no están configuradas, el formulario abre WhatsApp con el mensaje prellenado (nunca se pierde un contacto).

## Despliegue (Vercel)

1. Sube el repo a GitHub y crea el proyecto en Vercel (framework: Next.js).
2. Agrega las variables de entorno.
3. En *Domains* agrega `gmvpgroupenterprise.com` y `www.gmvpgroupenterprise.com` y apunta los DNS (A `76.76.21.21` / CNAME `cname.vercel-dns.com`).
4. Las URLs viejas de WordPress ya redirigen (301) a las nuevas: ver `next.config.ts`.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion` (desactiva smooth scroll, cursor, preloader y animaciones pesadas).
- Cursor personalizado solo en dispositivos con mouse.
- Enlace “Saltar al contenido”, foco visible, roles ARIA en tabs/acordeones.
- SEO: metadata por página, Open Graph generado, JSON-LD, `sitemap.xml` y `robots.txt`.

## Pendientes con el cliente

- [ ] Logo oficial en SVG/PNG → reemplazar `src/components/layout/Logo.tsx` y `src/app/icon.svg`
- [ ] Confirmar correo principal (hoy: gerencia@) y si el +57 313 694 0102 tiene WhatsApp
- [ ] “Grupo Empresarial Kapital One S.A.S.” aparecía en las FAQ originales: se generalizó a “el grupo”; confirmar
- [ ] Año en EE. UU. del fundador (el sitio viejo decía 2001 y 2003; se usó 2003)
- [ ] Valor por acción y planes de cuotas reales → `src/content/invest.ts` (`sharePrice`, `installmentOptions`)
- [ ] Foto del fundador / equipo / oficina (opcional, mejoraría mucho la página Fundador)
- [ ] Revisión legal del texto de privacidad y del disclaimer
