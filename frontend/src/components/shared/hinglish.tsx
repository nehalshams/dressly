"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/language";

// Italic helper text shown only when Hinglish mode is on. Reads the language
// from context so callers don't need to pass `hi` down.
export function Hinglish({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { hi } = useLanguage();
  if (!hi) return null;
  return (
    <p className={`font-sans italic text-[0.8rem] leading-relaxed text-muted-foreground/90 ${className}`}>
      {children}
    </p>
  );
}
