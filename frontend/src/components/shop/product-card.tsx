"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card">
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={liked}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-plum backdrop-blur transition-smooth hover:bg-background"
      >
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      </button>

      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-smooth duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <span className="rounded-full bg-background/85 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-plum backdrop-blur">
              {product.type === "STITCHED" ? "Stitched" : "Unstitched"}
            </span>
            {product.isNew && (
              <span className="w-fit rounded-full bg-gradient-plum px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-primary-foreground">
                New
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground">{product.outlet}</p>
          <h3 className="mt-1 line-clamp-1 font-serif text-lg text-plum">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-current text-primary-glow" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-medium text-plum">${product.price}</span>
            {product.stitchingAvailable && (
              <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-primary-glow">
                <Scissors className="h-3 w-3" /> Stitching
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
