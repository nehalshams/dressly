"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useProducts } from "@/lib/products-store";
import {
  CATEGORIES,
  SIZES,
  COLORS,
  type Product,
  type ProductType,
  type ProductVariant,
  type StitchingOption,
} from "@/data/products";
import defaultImg from "@/assets/cat-boutique.jpg";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-smooth focus-visible:ring-2 focus-visible:ring-plum";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground/80";

function slugify(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "product"}-${Math.random().toString(36).slice(2, 6)}`;
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { addProduct, updateProduct } = useProducts();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [type, setType] = useState<ProductType>(product?.type ?? "STITCHED");
  const [category, setCategory] = useState<string>(product?.category ?? CATEGORIES[0]);
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [colors, setColors] = useState<string[]>(product?.colors ?? []);
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants ?? []);
  const [stitchingAvailable, setStitchingAvailable] = useState(product?.stitchingAvailable ?? true);
  const [stitchingBaseFee, setStitchingBaseFee] = useState(
    product?.stitchingBaseFee != null ? String(product.stitchingBaseFee) : ""
  );
  const [stitchingOptions, setStitchingOptions] = useState<StitchingOption[]>(
    product?.stitchingOptions ?? []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleColor = (c: string) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const addVariant = () =>
    setVariants((prev) => [...prev, { size: SIZES[0], color: COLORS[0].name, stock: 0 }]);
  const updateVariant = (i: number, patch: Partial<ProductVariant>) =>
    setVariants((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  const removeVariant = (i: number) =>
    setVariants((prev) => prev.filter((_, idx) => idx !== i));

  const addOption = () =>
    setStitchingOptions((prev) => [...prev, { name: "", price: 0 }]);
  const updateOption = (i: number, patch: Partial<StitchingOption>) =>
    setStitchingOptions((prev) => prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));
  const removeOption = (i: number) =>
    setStitchingOptions((prev) => prev.filter((_, idx) => idx !== i));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!price || Number(price) <= 0) next.price = "Enter a price greater than 0.";
    if (type === "STITCHED" && variants.length === 0)
      next.variants = "Add at least one size variant.";
    if (type === "UNSTITCHED" && colors.length === 0)
      next.colors = "Select at least one color.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const sizes =
      type === "STITCHED" ? Array.from(new Set(variants.map((v) => v.size))) : [];
    const finalColors =
      type === "STITCHED"
        ? Array.from(new Set(variants.map((v) => v.color)))
        : colors;

    const saved: Product = {
      id: product?.id ?? slugify(name),
      name: name.trim(),
      description: description.trim() || undefined,
      type,
      category,
      price: Number(price),
      sizes,
      colors: finalColors,
      outlet: product?.outlet ?? "Meher Studio",
      img: product?.img ?? defaultImg,
      rating: product?.rating ?? 0,
      reviews: product?.reviews ?? 0,
      isNew: product?.isNew ?? true,
      variants: type === "STITCHED" ? variants : undefined,
      stitchingAvailable: type === "UNSTITCHED" ? stitchingAvailable : undefined,
      stitchingBaseFee:
        type === "UNSTITCHED" && stitchingBaseFee ? Number(stitchingBaseFee) : undefined,
      stitchingOptions: type === "UNSTITCHED" ? stitchingOptions : undefined,
    };

    if (isEdit) {
      updateProduct(saved);
      toast.success(`Saved "${saved.name}".`);
    } else {
      addProduct(saved);
      toast.success(`Created "${saved.name}".`);
    }
    router.push("/vendor/products");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => router.push("/vendor/products")}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-plum"
        >
          <ArrowLeft className="h-4 w-4" /> Back to products
        </button>
        <h1 className="font-serif text-3xl text-plum">
          {isEdit ? "Edit product" : "Add product"}
        </h1>
      </div>

      {/* Basics */}
      <section className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <h2 className="font-serif text-lg text-plum">Basics</h2>

        <div>
          <label className={labelClass} htmlFor="name">Product name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Blush Anarkali Suit"
            className={cn(inputClass, errors.name && "border-red-400 focus-visible:ring-red-400")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Fabric, fit, occasion…"
            className={cn(inputClass, "resize-none")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className={cn(inputClass, errors.price && "border-red-400 focus-visible:ring-red-400")}
            />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <div className="flex gap-2">
            {(["STITCHED", "UNSTITCHED"] as ProductType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-smooth",
                  type === t
                    ? "border-plum bg-gradient-plum text-primary-foreground"
                    : "border-border bg-background text-foreground/70 hover:border-plum/40"
                )}
              >
                {t === "STITCHED" ? "Stitched (ready-to-wear)" : "Unstitched (fabric)"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stitched: variants */}
      {type === "STITCHED" && (
        <section className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg text-plum">Variants</h2>
              <p className="text-sm text-muted-foreground">Size × color, each with its own stock.</p>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-plum hover:bg-secondary"
            >
              <Plus className="h-4 w-4" /> Add variant
            </button>
          </div>

          {errors.variants && <p className="text-xs text-red-600">{errors.variants}</p>}

          {variants.length > 0 && (
            <div className="space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-3">
                  <div>
                    {i === 0 && <label className={labelClass}>Size</label>}
                    <select
                      value={v.size}
                      onChange={(e) => updateVariant(i, { size: e.target.value })}
                      className={inputClass}
                    >
                      {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    {i === 0 && <label className={labelClass}>Color</label>}
                    <select
                      value={v.color}
                      onChange={(e) => updateVariant(i, { color: e.target.value })}
                      className={inputClass}
                    >
                      {COLORS.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    {i === 0 && <label className={labelClass}>Stock</label>}
                    <input
                      type="number"
                      min={0}
                      value={v.stock}
                      onChange={(e) => updateVariant(i, { stock: Number(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    aria-label="Remove variant"
                    className="mb-1 rounded-lg p-2.5 text-foreground/60 transition-smooth hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Unstitched: colors + stitching service */}
      {type === "UNSTITCHED" && (
        <>
          <section className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
            <h2 className="font-serif text-lg text-plum">Colors</h2>
            <div className="flex flex-wrap gap-2.5">
              {COLORS.map((c) => {
                const active = colors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => toggleColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={active}
                    title={c.name}
                    className={cn(
                      "h-8 w-8 rounded-full border transition-smooth",
                      active ? "ring-2 ring-plum ring-offset-2 ring-offset-card" : "border-border"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
            {errors.colors && <p className="text-xs text-red-600">{errors.colors}</p>}
          </section>

          <section className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
            <h2 className="font-serif text-lg text-plum">Stitching service</h2>

            <label className="flex items-center gap-2 text-sm text-foreground/80">
              <input
                type="checkbox"
                checked={stitchingAvailable}
                onChange={(e) => setStitchingAvailable(e.target.checked)}
                className="h-4 w-4 accent-plum"
              />
              Offer made-to-measure stitching for this item
            </label>

            {stitchingAvailable && (
              <>
                <div className="max-w-xs">
                  <label className={labelClass} htmlFor="fee">Base stitching fee ($)</label>
                  <input
                    id="fee"
                    type="number"
                    min={0}
                    value={stitchingBaseFee}
                    onChange={(e) => setStitchingBaseFee(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground/80">Priced add-ons</p>
                      <p className="text-xs text-muted-foreground">e.g. lining, piping, express turnaround.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addOption}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-plum hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4" /> Add add-on
                    </button>
                  </div>
                  {stitchingOptions.map((o, i) => (
                    <div key={i} className="grid grid-cols-[1fr_8rem_auto] items-center gap-3">
                      <input
                        value={o.name}
                        onChange={(e) => updateOption(i, { name: e.target.value })}
                        placeholder="Add-on name"
                        className={inputClass}
                      />
                      <input
                        type="number"
                        min={0}
                        value={o.price}
                        onChange={(e) => updateOption(i, { price: Number(e.target.value) })}
                        placeholder="$"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(i)}
                        aria-label="Remove add-on"
                        className="rounded-lg p-2.5 text-foreground/60 transition-smooth hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </>
      )}

      <p className="text-xs text-muted-foreground">
        Note: image upload arrives with the backend — new products use a placeholder image for now.
      </p>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/vendor/products")}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/70 transition-smooth hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-gradient-plum px-7 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-smooth hover:opacity-90"
        >
          {isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
