import Link from "next/link";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" aria-label="Dressly home">
          <Logo />
        </Link>
        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-plum"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 text-plum">
          <button aria-label="Search" className="rounded-full p-2 transition-smooth hover:bg-secondary">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Wishlist" className="rounded-full p-2 transition-smooth hover:bg-secondary">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="rounded-full p-2 transition-smooth hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
