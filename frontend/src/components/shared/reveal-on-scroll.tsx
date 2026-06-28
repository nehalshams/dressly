"use client";

import { useReveal } from "@/hooks/use-reveal";

// Mounts the scroll-reveal observer for the whole page. Renders nothing.
export function RevealOnScroll() {
  useReveal();
  return null;
}
