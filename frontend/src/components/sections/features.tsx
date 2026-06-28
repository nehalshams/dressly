import { Hinglish } from "@/components/shared/hinglish";
import { features } from "@/data/landing-content";

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">Everything in one place</p>
          <h2 className="mt-4 font-serif text-4xl text-plum md:text-5xl">A marketplace built for modern wardrobes</h2>
          <p className="mt-4 text-muted-foreground">From neighbourhood boutiques to bespoke tailors — Dressly puts every kind of fashion experience at your fingertips.</p>
          <Hinglish className="mt-3">Har tarah ke fashion ki ek hi jagah.</Hinglish>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-blush text-plum transition-smooth group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-plum">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <Hinglish className="mt-2">{f.hi}</Hinglish>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
