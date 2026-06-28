"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useProducts } from "@/lib/products-store";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function ProductsTable() {
  // In production this would be filtered by the vendor's outletId.
  const { products, removeProduct } = useProducts();

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    removeProduct(id);
    toast.success(`Deleted "${name}".`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-plum">Products</h1>
          <p className="mt-1 text-muted-foreground">{products.length} products in your store</p>
        </div>
        <Link
          href="/vendor/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-plum px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-smooth hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/40 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image src={p.img} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-plum">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.outlet}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-foreground/80">
                  {p.type === "STITCHED" ? "Stitched" : "Unstitched"}
                </td>
                <td className="px-6 py-4 text-foreground/80">{p.category}</td>
                <td className="px-6 py-4 font-medium">${p.price}</td>
                <td className="px-6 py-4">
                  <StatusBadge status="ACTIVE" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/vendor/products/${p.id}/edit`}
                      aria-label={`Edit ${p.name}`}
                      className="rounded-lg p-2 text-foreground/60 transition-smooth hover:bg-secondary hover:text-plum"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.name)}
                      aria-label={`Delete ${p.name}`}
                      className="rounded-lg p-2 text-foreground/60 transition-smooth hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
