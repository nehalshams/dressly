"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { ProductFilters, type FilterState } from "@/components/shop/product-filters";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
] as const;

const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

const initialFilters: FilterState = {
  type: "ALL",
  categories: [],
  sizes: [],
  colors: [],
  maxPrice: priceBounds.max,
};

export function ShopCatalog() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (filters.type === "ALL" || p.type === filters.type) &&
        (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
        (filters.sizes.length === 0 || p.sizes.some((s) => filters.sizes.includes(s))) &&
        (filters.colors.length === 0 || p.colors.some((c) => filters.colors.includes(c))) &&
        p.price <= filters.maxPrice
    );

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
    }
    return sorted;
  }, [filters, sort]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">Shop</p>
        <h1 className="mt-2 font-serif text-4xl text-plum md:text-5xl">All Collections</h1>
        <p className="mt-2 text-muted-foreground">
          Stitched and unstitched pieces from boutiques and tailors across Dressly.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        {/* Filters — sidebar on desktop, collapsible on mobile */}
        <ProductFilters
          value={filters}
          onChange={setFilters}
          priceBounds={priceBounds}
          onReset={resetFilters}
          className={cn(
            "mb-8 rounded-3xl border border-border/60 bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:mb-0 lg:self-start",
            showFilters ? "block" : "hidden lg:block"
          )}
        />

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-plum lg:hidden"
            >
              {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              Filters
            </button>
            <p className="hidden text-sm text-muted-foreground lg:block">
              {results.length} {results.length === 1 ? "item" : "items"}
            </p>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-plum"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
              <p className="font-serif text-xl text-plum">No items match your filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try removing a filter or widening the price range.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-gradient-plum px-6 py-2 text-sm text-primary-foreground transition-smooth hover:opacity-90"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
