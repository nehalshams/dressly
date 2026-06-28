import { LanguageProvider } from "@/lib/language";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyDressly } from "@/components/sections/why-dressly";
import { Testimonials } from "@/components/sections/testimonials";
import { Waitlist } from "@/components/sections/waitlist";

export default function Home() {
  return (
    <LanguageProvider>
      <RevealOnScroll />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Categories />
        <Features />
        <HowItWorks />
        <WhyDressly />
        <Testimonials />
        <Waitlist />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
