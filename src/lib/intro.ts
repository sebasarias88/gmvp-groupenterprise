"use client";

/** Signals that the intro preloader has finished (or was skipped). */
export function markIntroDone() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
}

/** Runs `cb` once the intro is done. Returns a cleanup function. */
export function onIntroDone(cb: () => void) {
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("intro:done", handler, { once: true });
  return () => window.removeEventListener("intro:done", handler);
}
