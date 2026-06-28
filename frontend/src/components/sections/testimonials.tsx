import { Star } from "lucide-react";
import { Hinglish } from "@/components/shared/hinglish";
import { testimonials } from "@/data/landing-content";

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">Loved early</p>
          <h2 className="mt-4 font-serif text-4xl text-plum md:text-5xl">Kind words from our community</h2>
          <Hinglish className="mt-3">Hamare early users kya keh rahe hain.</Hinglish>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal rounded-3xl border border-border/60 bg-card p-8 shadow-soft"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 text-primary-glow">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 font-serif text-xl leading-snug text-plum">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-blush font-serif text-plum">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-plum">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
