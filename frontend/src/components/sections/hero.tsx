"use client";

import Image from "next/image";
import { ArrowRight, Star, Store, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hinglish } from "@/components/shared/hinglish";
import { scrollToWaitlist } from "@/lib/scroll";
import { categories, trustBadges } from "@/data/landing-content";
import hero from "@/assets/hero.png";

const avatars = categories.slice(0, 3).map((c) => c.img);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pb-24 pt-36 md:pb-32 md:pt-44">
      {/* Full-bleed background image */}
      <Image
        src={hero}
        alt="Dressly fashion collage of women and children in ethnic and western outfits"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center]"
      />
      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blush/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-plum backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-plum" /> Launching Soon
          </span>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-plum text-balance md:text-6xl lg:text-7xl">
            Discover Fashion <em className="font-serif italic text-primary-glow">That Fits</em> Your Style.
          </h1>
          <Hinglish className="mt-4 text-base">
            Apni pasand ke kapde, aas paas ke trusted boutiques aur online stores se.
          </Hinglish>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Dressly brings together local boutiques, master tailors, and online sellers — so women's and kids' fashion lives in one elegant marketplace.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <Button
                size="lg"
                className="rounded-full bg-gradient-plum px-8 text-base text-primary-foreground shadow-soft transition-smooth hover:shadow-card"
              >
                Coming Soon
              </Button>
              <Hinglish className="pl-3 text-xs">Jald hi aa raha hai.</Hinglish>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                onClick={scrollToWaitlist}
                size="lg"
                variant="outline"
                className="rounded-full border-plum/30 bg-white/60 px-8 text-base text-plum backdrop-blur hover:bg-white"
              >
                Join Waitlist <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Hinglish className="pl-3 text-xs">Sabse pehle access paane ke liye register karein.</Hinglish>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-plum">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p>Loved by 2,500+ early members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating feature badges */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        <div className="glass flex items-center gap-3 rounded-2xl px-5 py-4 shadow-soft">
          <Store className="h-5 w-5 text-plum" />
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Local Boutiques</p>
            <p className="text-sm font-medium text-plum">Curated near you</p>
          </div>
        </div>
        <div className="glass flex items-center gap-3 rounded-2xl px-5 py-4 shadow-soft">
          <Scissors className="h-5 w-5 text-plum" />
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Custom Tailoring</p>
            <p className="text-sm font-medium text-plum">Made to your measurements</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative mx-auto mt-20 max-w-6xl px-6">
        <div className="glass flex flex-wrap items-center justify-around gap-4 rounded-2xl px-6 py-4 shadow-soft">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-plum">{b.label}</p>
              <Hinglish className="mt-0.5 text-[0.7rem]">{b.hi}</Hinglish>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
