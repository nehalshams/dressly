import { Instagram, Facebook, Twitter } from "@/components/brand-icons";
import { Logo } from "@/components/shared/logo";
import { Hinglish } from "@/components/shared/hinglish";

const SOCIALS = [Instagram, Facebook, Twitter];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The elegant marketplace for women's and kids' fashion — connecting boutiques, tailors, and online sellers in one place.
          </p>
          <Hinglish className="mt-2 max-w-xs">
            Women's aur kids' fashion ke liye ek elegant marketplace.
          </Hinglish>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-plum shadow-soft transition-smooth hover:bg-gradient-plum hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-serif text-sm font-medium uppercase tracking-widest text-plum">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-plum">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-plum">How it works</a></li>
            <li><a href="#categories" className="hover:text-plum">Categories</a></li>
            <li><a href="#waitlist" className="hover:text-plum">Waitlist</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-sm font-medium uppercase tracking-widest text-plum">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-plum">About</a></li>
            <li><a href="#" className="hover:text-plum">For boutiques</a></li>
            <li><a href="#" className="hover:text-plum">Privacy</a></li>
            <li><a href="#" className="hover:text-plum">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dressly. Crafted with care.
      </div>
    </footer>
  );
}
