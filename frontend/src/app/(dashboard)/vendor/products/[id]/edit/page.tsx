"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/lib/products-store";
import { ProductForm } from "@/components/dashboard/product-form";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const product = getProduct(params.id);

  if (!product) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
        <p className="font-serif text-xl text-plum">Product not found</p>
        <p className="mt-2 text-sm text-muted-foreground">It may have been deleted.</p>
        <Link
          href="/vendor/products"
          className="mt-5 inline-block rounded-full bg-gradient-plum px-6 py-2 text-sm text-primary-foreground hover:opacity-90"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
