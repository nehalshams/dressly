import { Hinglish } from "@/components/shared/hinglish";
import { steps } from "@/data/landing-content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gradient-soft py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-glow">How it works</p>
          <h2 className="mt-4 font-serif text-4xl text-plum md:text-5xl">Three steps to your next favourite outfit</h2>
          <Hinglish className="mt-3">Teen aasaan steps mein apna favourite outfit.</Hinglish>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal relative rounded-3xl bg-card p-8 shadow-soft"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute -top-4 left-8 rounded-full bg-gradient-plum px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                Step {i + 1}
              </div>
              <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-plum">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-plum">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <Hinglish className="mt-2">{s.hi}</Hinglish>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
