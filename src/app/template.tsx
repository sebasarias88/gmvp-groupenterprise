import type { ReactNode } from "react";

/**
 * Page transition done in pure CSS (see globals.css): a gold curtain lifts and the
 * content fades in. Being CSS-only it starts on first paint and never hides
 * content behind JavaScript hydration.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-curtain pointer-events-none fixed inset-0 z-[150] bg-gold" />
      <div className="page-enter">{children}</div>
    </>
  );
}
