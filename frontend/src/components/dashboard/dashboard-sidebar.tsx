"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Scissors,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/vendor", icon: LayoutDashboard },
  { label: "Products", href: "/vendor/products", icon: Package },
  { label: "Orders", href: "/vendor/orders", icon: ShoppingCart },
  { label: "Tailoring", href: "/vendor/tailoring", icon: Scissors },
  { label: "Payouts", href: "/vendor/payouts", icon: Wallet },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-card lg:flex">
      <div className="border-b border-border/60 px-6 py-5">
        <Link href="/" aria-label="Dressly home">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Vendor
        </p>
        {NAV.map((item) => {
          const active =
            item.href === "/vendor"
              ? pathname === "/vendor"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth",
                active
                  ? "bg-gradient-plum text-primary-foreground shadow-soft"
                  : "text-foreground/70 hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/60 transition-smooth hover:bg-secondary"
        >
          <ShieldCheck className="h-4 w-4" />
          Platform admin
        </Link>
      </div>
    </aside>
  );
}
