"use client";

import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  SIZES,
  COLORS,
  type ProductType,
} from "@/data/products";

export interface FilterState {
  type: "ALL" | ProductType;
  categories: string[];
  sizes: string[];
  colors: string[];
  maxPrice: number;
}

const TYPE_OPTIONS: { label: string; value: FilterState["type"] }[] = [
  { label: "All", value: "ALL" },
  { label: "Stitched", value: "STITCHED" },
  { label: "Unstitched", value: "UNSTITCHED" },
];

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function ProductFilters({
  value,
  onChange,
  priceBounds,
  onReset,
  className,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  priceBounds: { min: number; max: number };
  onReset: () => void;
  className?: string;
}) {
  return (
    <aside className={cn("space-y-8", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-plum">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary-glow hover:underline"
        >
          Reset all
        </button>
      </div>

      {/* Type */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Type</p>
        <div className="flex gap-2">
          {TYPE_OPTIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ ...value, type: t.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-smooth",
                value.type === t.value
                  ? "border-plum bg-gradient-plum text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-plum/40"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
              <input
                type="checkbox"
                checked={value.categories.includes(c)}
                onChange={() => onChange({ ...value, categories: toggle(value.categories, c) })}
                className="h-4 w-4 accent-plum"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...value, sizes: toggle(value.sizes, s) })}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-smooth",
                value.sizes.includes(s)
                  ? "border-plum bg-gradient-plum text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-plum/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[0.7rem] text-muted-foreground">Sizes apply to stitched items.</p>
      </div>

      {/* Color */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Color</p>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => {
            const active = value.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onChange({ ...value, colors: toggle(value.colors, c.name) })}
                aria-label={c.name}
                aria-pressed={active}
                title={c.name}
                className={cn(
                  "h-7 w-7 rounded-full border transition-smooth",
                  active ? "ring-2 ring-plum ring-offset-2 ring-offset-background" : "border-border"
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Max price: <span className="text-plum">${value.maxPrice}</span>
        </p>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={1}
          value={value.maxPrice}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
          className="w-full accent-plum"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-muted-foreground">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
      </div>
    </aside>
  );
}
