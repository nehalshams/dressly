import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ShopCatalog } from "@/components/shop/shop-catalog";

export const metadata: Metadata = {
  title: "Shop — Dressly",
  description: "Browse stitched and unstitched women's and kids' fashion from boutiques and tailors on Dressly.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ShopCatalog />
      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dressly. Crafted with care.
      </footer>
    </div>
  );
}
