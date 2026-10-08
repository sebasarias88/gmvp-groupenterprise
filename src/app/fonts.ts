import localFont from "next/font/local";

/**
 * Self-hosted fonts via next/font: preloaded, hashed and served with a
 * metric-matched fallback so text never jumps when the real font arrives.
 */
export const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

export const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const fontVariables = [serif.variable, sans.variable, mono.variable].join(" ");
