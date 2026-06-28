"use client";

import { Button } from "@/components/ui/button";
import { Hinglish } from "@/components/shared/hinglish";
import { scrollToWaitlist } from "@/lib/scroll";
import { why } from "@/data/landing-content";

export function WhyDressly() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">Why Dressly</p>
          <h2 className="mt-4 font-serif text-4xl text-plum md:text-5xl">Fashion that's <em className="italic">personal</em>, local, and effortless.</h2>
          <p className="mt-5 text-muted-foreground">
            We're building more than a shopping app. Dressly champions independent designers and tailors, while giving you the polish and convenience of a premium marketplace.
          </p>
          <Hinglish className="mt-3 max-w-md">
            Sirf ek shopping app nahi — Dressly local designers aur tailors ko support karta hai.
          </Hinglish>
          <Button
            onClick={scrollToWaitlist}
            className="mt-8 rounded-full bg-gradient-plum px-7 text-primary-foreground hover:opacity-90"
          >
            Be the first to try it
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {why.map((w, i) => (
            <div
              key={w.title}
              className="reveal rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-blush text-plum">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-plum">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
              <Hinglish className="mt-1.5">{w.hi}</Hinglish>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
