"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { categories } from "@/data/landing-content";

export function Categories() {
  const { hi } = useLanguage();

  return (
    <section id="categories" className="bg-gradient-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">Shop by category</p>
            <h2 className="mt-4 font-serif text-4xl text-plum md:text-5xl">A wardrobe for every occasion</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            From timeless ethnic pieces to contemporary western looks — explore curated collections.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <a
              key={c.label}
              href="#waitlist"
              className="reveal group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-soft transition-smooth hover:shadow-card"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <Image
                src={c.img}
                alt={c.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-smooth duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <div>
                  <h3 className="font-serif text-2xl text-primary-foreground">{c.label}</h3>
                  {hi && (
                    <p className="mt-1 font-sans italic text-xs text-primary-foreground/80">{c.hi}</p>
                  )}
                </div>
                <span className="glass-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-smooth group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
