"use client";

import { Languages } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from "@/lib/language";
import { scrollToWaitlist } from "@/lib/scroll";

const NAV_LINKS = ["Features", "How it works", "Categories", "Waitlist"];

export function Navbar() {
  const { hi, toggleLang } = useLanguage();

  const handleToggle = () => {
    toggleLang();
    toast.success(
      !hi
        ? "Hinglish helper text on kar diya gaya hai."
        : "Switched to English only."
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-full px-5 py-3 shadow-soft">
          <Logo />
          <div className="hidden gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-plum"
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggle}
              aria-label="Toggle language"
              aria-pressed={hi}
              className="group inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-plum backdrop-blur transition-smooth hover:bg-white"
            >
              <Languages className="h-3.5 w-3.5" />
              <span className={hi ? "opacity-50" : ""}>EN</span>
              <span className="opacity-40">/</span>
              <span className={hi ? "" : "opacity-50"}>HI</span>
            </button>
            <Button
              onClick={scrollToWaitlist}
              size="sm"
              className="hidden rounded-full bg-gradient-plum text-primary-foreground hover:opacity-90 sm:inline-flex"
            >
              Join Waitlist
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
